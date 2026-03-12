import ytDlpPkg from 'yt-dlp-exec';
import { Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import ffmpeg from '@ffmpeg-installer/ffmpeg';

// Use the local yt-dlp binary on Windows, or default to system/package on other platforms (like Render/Linux)
const isWindows = process.platform === 'win32';
const ytDlpPath = isWindows ? path.join(process.cwd(), 'yt-dlp.exe') : undefined;
const ffmpegPath = ffmpeg.path;

// Create the yt-dlp instance - if path is undefined, it uses the package's internal binary
const ytDlp = ytDlpPath ? (ytDlpPkg as any).create(ytDlpPath) : ytDlpPkg;

export class YoutubeService {
  /**
   * Main download handler
   */
  async handleDownload(url: string, format: string, quality: string, res: Response) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid URL');
    }

    console.log(`[YouTube] Request: ${format} | ${quality} | ${url}`);

    try {
      console.log('[YouTube] Fetching metadata...');
      // Get metadata first to get the title
      const info = await ytDlp(url, {
        dumpJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
      });

      // Need to parse if ytDlp returned a string
      const metadata = typeof info === 'string' ? JSON.parse(info) : info;
      const title = (metadata.title || 'video').replace(/[^\w\s-]/g, '');
      console.log(`[YouTube] Title: ${title}`);

      if (format === 'mp3') {
        await this.handleAudio(url, title, res);
      } else {
        await this.handleVideo(url, title, quality, res);
      }
    } catch (error: any) {
      console.error('[yt-dlp Metadata Error]:', error.message || error);
      if (!res.headersSent) {
        res
          .status(500)
          .json({
            error: 'Failed to fetch video information. YouTube might be blocking the request.',
          });
      }
    }
  }

  private async handleAudio(url: string, title: string, res: Response) {
    console.log('[YouTube] Starting Audio Download...');

    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), 'temp_downloads');
    await fs.ensureDir(tempDir);

    const tempFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`;
    const tempFilePath = path.join(tempDir, tempFileName);

    try {
      const ytDlpProcess = ytDlp.exec(url, {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: '0',
        output: tempFilePath,
        ffmpegLocation: ffmpegPath,
        noWarnings: true,
        noCheckCertificates: true,
      });

      if (ytDlpProcess.stderr) {
        ytDlpProcess.stderr.on('data', (data: any) => {
          const output = data.toString();
          if (!output.includes('%')) {
            console.error(`[yt-dlp Audio Stderr]: ${output}`);
          }
        });
      }

      // Wait for the process to finish
      await new Promise((resolve, reject) => {
        ytDlpProcess.on('error', reject);
        ytDlpProcess.on('close', (code: number) => {
          if (code === 0) resolve(true);
          else reject(new Error(`yt-dlp exited with code ${code}`));
        });
      });

      console.log(`[YouTube] Audio download complete to ${tempFilePath}`);

      // Check if file exists and has size
      if (!(await fs.pathExists(tempFilePath))) {
        throw new Error('Downloaded audio file not found');
      }

      const stats = await fs.stat(tempFilePath);
      if (stats.size === 0) {
        throw new Error('Downloaded audio file is empty');
      }

      // Send the file
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
      res.setHeader('Content-Length', stats.size);

      const readStream = fs.createReadStream(tempFilePath);
      readStream.pipe(res);

      readStream.on('end', async () => {
        console.log(`[YouTube] Audio stream finished for ${title}`);
        await fs
          .remove(tempFilePath)
          .catch(err => console.error('Failed to remove temp audio file:', err));
      });

      readStream.on('error', async err => {
        console.error('[Audio Stream Error]:', err);
        await fs
          .remove(tempFilePath)
          .catch(err => console.error('Failed to remove temp audio file:', err));
      });
    } catch (error: any) {
      console.error('[handleAudio Error]:', error.message || error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Failed to process audio. YouTube might be blocking the request or FFmpeg failed.',
        });
      }
      // Cleanup on error
      if (await fs.pathExists(tempFilePath)) {
        await fs.remove(tempFilePath).catch(() => {});
      }
    }
  }

  private async handleVideo(url: string, title: string, quality: string, res: Response) {
    const height = parseInt(quality) || 720;
    console.log(`[YouTube] Starting Video Download (${height}p)...`);

    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), 'temp_downloads');
    await fs.ensureDir(tempDir);

    const tempFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;
    const tempFilePath = path.join(tempDir, tempFileName);

    // Enhanced format string: Prefer MP4 but allow all high-quality formats for 4K/2K
    const formatString = `(bv*[height<=${height}][ext=mp4]+ba[ext=m4a]/b[height<=${height}][ext=mp4] / bv*[height<=${height}]+ba/b[height<=${height}] / bestvideo+bestaudio/best)`;

    console.log(`[YouTube] Using format: ${formatString}`);

    try {
      const ytDlpProcess = ytDlp.exec(url, {
        format: formatString,
        output: tempFilePath,
        ffmpegLocation: ffmpegPath,
        noWarnings: true,
        noCheckCertificates: true,
      });

      if (ytDlpProcess.stderr) {
        ytDlpProcess.stderr.on('data', (data: any) => {
          const output = data.toString();
          if (output.includes('%')) {
            // Suppress progress logs but can be used for tracking
          } else {
            console.error(`[yt-dlp Video Stderr]: ${output}`);
          }
        });
      }

      // Wait for the process to finish
      await new Promise((resolve, reject) => {
        ytDlpProcess.on('error', reject);
        ytDlpProcess.on('close', (code: number) => {
          if (code === 0) resolve(true);
          else reject(new Error(`yt-dlp exited with code ${code}`));
        });
      });

      console.log(`[YouTube] Download complete to ${tempFilePath}`);

      // Check if file exists and has size
      if (!(await fs.pathExists(tempFilePath))) {
        throw new Error('Downloaded file not found');
      }

      const stats = await fs.stat(tempFilePath);
      if (stats.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      // Send the file
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
      res.setHeader('Content-Length', stats.size);

      const readStream = fs.createReadStream(tempFilePath);
      readStream.pipe(res);

      readStream.on('end', async () => {
        console.log(`[YouTube] Stream finished for ${title}`);
        await fs
          .remove(tempFilePath)
          .catch(err => console.error('Failed to remove temp file:', err));
      });

      readStream.on('error', async err => {
        console.error('[Stream Error]:', err);
        await fs
          .remove(tempFilePath)
          .catch(err => console.error('Failed to remove temp file:', err));
      });
    } catch (error: any) {
      console.error('[handleVideo Error]:', error.message || error);
      if (!res.headersSent) {
        res
          .status(500)
          .json({
            error:
              'Failed to process high-quality video. The requested resolution might not be available or YouTube is blocking the request.',
          });
      }
      // Cleanup on error
      if (await fs.pathExists(tempFilePath)) {
        await fs.remove(tempFilePath).catch(() => {});
      }
    }
  }
}
