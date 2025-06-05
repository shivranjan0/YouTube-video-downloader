const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { PassThrough } = require('stream');
const { downloadFromInstagram } = require('./platforms/instagram');
const { downloadFromTikTok } = require('./platforms/tiktok');
const { downloadFromFacebook } = require('./platforms/facebook');
const { detectPlatform } = require('../src/utils/detectPlatform');
import { Request, Response } from 'express';

// Configure FFmpeg path
console.log('FFmpeg path:', ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath);

interface DownloadRequest {
  url: string;
  format: string;
  quality?: string;
}

interface VideoFormat {
  container: string;
  height?: number;
  hasVideo?: boolean;
  hasAudio?: boolean;
  qualityLabel?: string;
  itag: number;
  audioBitrate?: number;
}

// Content type mapping for different formats
const contentTypes = {
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  webm: 'video/webm'
};

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use((req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Basic health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Add error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Add FFmpeg path setup if needed
// Uncomment and set these if FFmpeg is not in system PATH
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffprobePath = require('@ffmpeg-installer/ffprobe').path;
// ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg.setFfprobePath(ffprobePath);

async function downloadYouTubeVideo(url: string, format: string, quality: string = '360') {
  try {
    console.log('Starting download process for:', url);
    console.log('Format:', format, 'Quality:', quality);

    const info = await ytdl.getInfo(url);
    let formats = info.formats;
    
    // For MP3 audio download
    if (format === 'mp3') {
      console.log('Processing MP3 download...');
      // Get the best audio format
      formats = ytdl.filterFormats(info.formats, 'audioonly');
      console.log('Available audio formats:', formats.length);
      
      formats.sort((a: VideoFormat, b: VideoFormat) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
      
      const selectedFormat = formats[0];
      if (!selectedFormat) {
        throw new Error('No suitable audio format found');
      }

      console.log('Selected audio format:', {
        audioBitrate: selectedFormat.audioBitrate,
        container: selectedFormat.container,
        itag: selectedFormat.itag,
        mimeType: selectedFormat.mimeType
      });

      return {
        info,
        format: selectedFormat,
        title: info.videoDetails.title,
        isAudio: true
      };
    }

    // For MP4 video, get formats with both audio and video
    if (format === 'mp4') {
      formats = formats.filter((f: VideoFormat) => {
        return (
          f.container === 'mp4' &&
          f.hasVideo &&
          f.hasAudio &&
          f.qualityLabel // Ensure it has a quality label
        );
      });

      // Sort by quality (resolution)
      formats.sort((a: VideoFormat, b: VideoFormat) => {
        const heightA = a.height || 0;
        const heightB = b.height || 0;
        return heightB - heightA;
      });

      console.log('Available qualities:', formats.map((f: VideoFormat) => ({
        quality: f.qualityLabel,
        height: f.height,
        itag: f.itag
      })));

      // Select format based on requested quality
      const targetHeight = parseInt(quality);
      let selectedFormat = formats.find((f: VideoFormat) => f.height === targetHeight);

      if (!selectedFormat) {
        // If exact quality not found, get the next best quality
        selectedFormat = formats.find((f: VideoFormat) => (f.height || 0) >= targetHeight) || formats[0];
      }

      if (!selectedFormat) {
        throw new Error('No suitable format found');
      }

      console.log('Selected format:', {
        quality: selectedFormat.qualityLabel,
        height: selectedFormat.height,
        container: selectedFormat.container,
        itag: selectedFormat.itag
      });

      return {
        info,
        format: selectedFormat,
        title: info.videoDetails.title
      };
    }
    
    throw new Error('Unsupported format');
  } catch (error) {
    console.error('Error in downloadYouTubeVideo:', error);
    throw error;
  }
}

app.post('/api/download', async (req: Request, res: Response) => {
  try {
    console.log('Received download request:', req.body);
    const { url, format, quality } = req.body as DownloadRequest;

    if (!url || !format) {
      return res.status(400).json({ error: 'URL and format are required' });
    }

    const platform = detectPlatform(url);
    console.log('Detected platform:', platform);

    if (!platform) {
      return res.status(400).json({ error: 'Unsupported platform or invalid URL' });
    }

    switch (platform) {
      case 'youtube':
        console.log('Processing YouTube URL:', url);
        try {
          if (!ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
          }

          const { info, format: selectedFormat, title, isAudio } = await downloadYouTubeVideo(url, format, quality);
          
          // Set appropriate headers
          const sanitizedTitle = title.replace(/[^\w\s-]/g, '');
          const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
          const mimeType = format === 'mp3' ? 'audio/mpeg' : 'video/mp4';
          
          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.${fileExtension}"`);

          if (isAudio) {
            console.log('Starting audio conversion...');
            const audioStream = ytdl.downloadFromInfo(info, {
              format: selectedFormat,
              quality: selectedFormat.itag
            });

            const passThrough = new PassThrough();
            
            // Convert to MP3 using FFmpeg
            const ffmpegCommand = ffmpeg(audioStream)
              .toFormat('mp3')
              .audioBitrate(192)
              .on('start', (commandLine: string) => {
                console.log('FFmpeg conversion started:', commandLine);
              })
              .on('error', (err: Error) => {
                console.error('FFmpeg error:', err);
                if (!res.headersSent) {
                  res.status(500).json({ error: 'Error converting audio: ' + err.message });
                }
              })
              .on('end', () => {
                console.log('FFmpeg conversion finished');
              });

            // Pipe through PassThrough stream to prevent premature closing
            ffmpegCommand
              .pipe(passThrough, { end: true })
              .pipe(res);

            // Handle stream errors
            audioStream.on('error', (err: Error) => {
              console.error('Audio stream error:', err);
              if (!res.headersSent) {
                res.status(500).json({ error: 'Error streaming audio: ' + err.message });
              }
            });

            // Clean up on client disconnect
            res.on('close', () => {
              audioStream.destroy();
              passThrough.destroy();
            });
          } else {
            // Handle video download
            const videoStream = ytdl.downloadFromInfo(info, {
              format: selectedFormat,
              quality: selectedFormat.itag
            });

            videoStream.on('error', (err: Error) => {
              console.error('Video stream error:', err);
              if (!res.headersSent) {
                res.status(500).json({ error: 'Error streaming video: ' + err.message });
              }
            });

            videoStream.pipe(res);

            // Clean up on client disconnect
            res.on('close', () => {
              videoStream.destroy();
            });
          }

        } catch (ytError) {
          console.error('YouTube download error:', ytError);
          if (!res.headersSent) {
            return res.status(500).json({ 
              error: ytError instanceof Error ? 
                'Failed to download from YouTube: ' + ytError.message : 
                'Failed to download from YouTube'
            });
          }
        }
        break;

      case 'instagram':
        console.log('Processing Instagram URL:', url);
        try {
          const igResult = await downloadFromInstagram(url, format);
          res.json(igResult);
        } catch (igError) {
          console.error('Instagram download error:', igError);
          return res.status(500).json({ error: 'Failed to download from Instagram' });
        }
        break;

      case 'tiktok':
        console.log('Processing TikTok URL:', url);
        try {
          const ttResult = await downloadFromTikTok(url, format);
          res.json(ttResult);
        } catch (ttError) {
          console.error('TikTok download error:', ttError);
          return res.status(500).json({ error: 'Failed to download from TikTok' });
        }
        break;

      case 'facebook':
        console.log('Processing Facebook URL:', url);
        try {
          const fbResult = await downloadFromFacebook(url, format);
          res.json(fbResult);
        } catch (fbError) {
          console.error('Facebook download error:', fbError);
          return res.status(500).json({ error: 'Failed to download from Facebook' });
        }
        break;

      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }
  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to process download' });
    }
  }
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err: Error) => {
  console.error('Failed to start server:', err);
  process.exit(1);
}); 