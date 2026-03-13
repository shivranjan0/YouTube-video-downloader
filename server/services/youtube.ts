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
    // 1. Clean the URL (remove tracking parameters like ?si=)
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.delete('si');
      url = parsedUrl.toString();
    } catch (e) {
      // If URL parsing fails, continue with original url
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid URL');
    }

    let cookieFilePath: string | undefined;

    try {
      // 1. Check for Cookies in Env Var
      if (process.env.YT_COOKIES && process.env.YT_COOKIES.length > 50) {
        const tempDir = isWindows ? path.join(process.cwd(), 'temp_downloads') : '/tmp';
        await fs.ensureDir(tempDir);
        cookieFilePath = path.join(tempDir, `cookies-${Date.now()}.txt`);
        await fs.writeFile(cookieFilePath, process.env.YT_COOKIES);
        console.log('[YouTube] Successfully loaded cookies from environment.');
      } else {
        console.warn('[YouTube] Warning: No YT_COOKIES found in environment. This will likely fail on Render!');
      }

      console.log(`[YouTube] Request: ${format} | ${quality} | ${url}`);
      console.log('[YouTube] Fetching metadata...');

      // 2. Advanced Bypass Options
      const commonOptions: any = {
        noWarnings: true,
        noCheckCertificates: true,
        addHeader: [
          'Accept-Language: en-US,en;q=0.9',
          'Referer: https://www.youtube.com/',
        ],
        forceIpv4: true,
        noCacheDir: true,
      };

      if (cookieFilePath) {
        commonOptions.cookies = cookieFilePath;
      }

      // 3. Client Rotation Strategy for Metadata
      const clientConfigs = [
        'youtube:player-client=ios,android;player-skip=web,canvas',
        'youtube:player-client=tv,ios;player-skip=web,canvas',
        'youtube:player-client=android;player-skip=web,canvas',
      ];

      let info: any;
      let lastError: any;
      let successfulConfigIndex = 0;

      for (let i = 0; i < clientConfigs.length; i++) {
        try {
          const clientArg = clientConfigs[i];
          console.log(`[YouTube] Fetching metadata (Attempt ${i + 1}/3 - ${clientArg})...`);
          
          info = await ytDlp(url, {
            ...commonOptions,
            extractorArgs: clientArg,
            dumpJson: true,
          });
          
          if (info) {
            successfulConfigIndex = i;
            break;
          }
        } catch (error: any) {
          lastError = error;
          console.warn(`[YouTube] Attempt ${i + 1} failed: ${error.message || 'Unknown error'}`);
          if (i < clientConfigs.length - 1) {
            console.log('[YouTube] Retrying with different client...');
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      }

      if (!info) {
        throw lastError || new Error('Failed to fetch metadata after multiple attempts');
      }

      // Need to parse if ytDlp returned a string
      const metadata = typeof info === 'string' ? JSON.parse(info) : info;
      const title = (metadata.title || 'video').replace(/[^\w\s-]/g, '');
      console.log(`[YouTube] Title: ${title}`);

      // 4. Update commonOptions for actual download
      const finalOptions = {
        ...commonOptions,
        extractorArgs: clientConfigs[successfulConfigIndex]
      };

      if (format === 'mp3') {
        await this.handleAudio(url, title, res, finalOptions);
      } else {
        await this.handleVideo(url, title, quality, res, finalOptions);
      }
    } catch (error: any) {
      console.error('[YouTube Error Details]:', error.message || error);
      if (!res.headersSent) {
        const isBotError = error.message?.includes('Sign in to confirm you') || error.stderr?.includes('bot');
        res.status(500).json({
          error: isBotError 
            ? 'YouTube is temporarily blocking requests. Try again in a few minutes or provide fresh cookies.' 
            : 'Failed to process request. Please check the URL or try a different format.',
        });
      }
    } finally {
      // Cleanup cookie file if created
      if (cookieFilePath && (await fs.pathExists(cookieFilePath))) {
        await fs.remove(cookieFilePath).catch(() => {});
      }
    }
  }

  private async handleAudio(url: string, title: string, res: Response, commonOptions: any) {
    console.log('[YouTube] Starting Audio Download...');

    const tempDir = isWindows ? path.join(process.cwd(), 'temp_downloads') : '/tmp';
    await fs.ensureDir(tempDir);

    const tempFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`;
    const tempFilePath = path.join(tempDir, tempFileName);

    try {
      const ytDlpProcess = ytDlp.exec(url, {
        ...commonOptions,
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: '0',
        output: tempFilePath,
        ffmpegLocation: ffmpegPath,
      });

      if (ytDlpProcess.stderr) {
        ytDlpProcess.stderr.on('data', (data: any) => {
          const output = data.toString();
          if (!output.includes('%')) {
            console.error(`[yt-dlp Audio Stderr]: ${output}`);
          }
        });
      }

      await new Promise((resolve, reject) => {
        ytDlpProcess.on('error', reject);
        ytDlpProcess.on('close', (code: number) => {
          if (code === 0) resolve(true);
          else reject(new Error(`yt-dlp exited with code ${code}`));
        });
      });

      console.log(`[YouTube] Audio download complete to ${tempFilePath}`);

      if (!(await fs.pathExists(tempFilePath))) {
        throw new Error('Downloaded audio file not found');
      }

      const stats = await fs.stat(tempFilePath);
      if (stats.size === 0) {
        throw new Error('Downloaded audio file is empty');
      }

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
      res.setHeader('Content-Length', stats.size);

      const readStream = fs.createReadStream(tempFilePath);
      readStream.pipe(res);

      readStream.on('end', async () => {
        console.log(`[YouTube] Audio stream finished for ${title}`);
        await fs.remove(tempFilePath).catch(err => console.error('Failed to remove temp audio file:', err));
      });

      readStream.on('error', async err => {
        console.error('[Audio Stream Error]:', err);
        await fs.remove(tempFilePath).catch(err => console.error('Failed to remove temp audio file:', err));
      });
    } catch (error: any) {
      console.error('[handleAudio Error Details]:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Failed to process audio. YouTube might be blocking the request or FFmpeg failed.',
        });
      }
      if (await fs.pathExists(tempFilePath)) {
        await fs.remove(tempFilePath).catch(() => {});
      }
    }
  }

  private async handleVideo(url: string, title: string, quality: string, res: Response, commonOptions: any) {
    const height = parseInt(quality) || 720;
    console.log(`[YouTube] Starting Video Download (${height}p)...`);

    const tempDir = isWindows ? path.join(process.cwd(), 'temp_downloads') : '/tmp';
    await fs.ensureDir(tempDir);

    const tempFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;
    const tempFilePath = path.join(tempDir, tempFileName);

    const formatString = `(bv*[height<=${height}][ext=mp4]+ba[ext=m4a]/b[height<=${height}][ext=mp4] / bv*[height<=${height}]+ba/b[height<=${height}] / bestvideo+bestaudio/best)`;

    console.log(`[YouTube] Using format: ${formatString}`);

    try {
      const ytDlpProcess = ytDlp.exec(url, {
        ...commonOptions,
        format: formatString,
        output: tempFilePath,
        ffmpegLocation: ffmpegPath,
      });

      if (ytDlpProcess.stderr) {
        ytDlpProcess.stderr.on('data', (data: any) => {
          const output = data.toString();
          if (!output.includes('%')) {
            console.error(`[yt-dlp Video Stderr]: ${output}`);
          }
        });
      }

      await new Promise((resolve, reject) => {
        ytDlpProcess.on('error', reject);
        ytDlpProcess.on('close', (code: number) => {
          if (code === 0) resolve(true);
          else reject(new Error(`yt-dlp exited with code ${code}`));
        });
      });

      console.log(`[YouTube] Download complete to ${tempFilePath}`);

      if (!(await fs.pathExists(tempFilePath))) {
        throw new Error('Downloaded file not found');
      }

      const stats = await fs.stat(tempFilePath);
      if (stats.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
      res.setHeader('Content-Length', stats.size);

      const readStream = fs.createReadStream(tempFilePath);
      readStream.pipe(res);

      readStream.on('end', async () => {
        console.log(`[YouTube] Stream finished for ${title}`);
        await fs.remove(tempFilePath).catch(err => console.error('Failed to remove temp file:', err));
      });

      readStream.on('error', async err => {
        console.error('[Stream Error]:', err);
        await fs.remove(tempFilePath).catch(err => console.error('Failed to remove temp file:', err));
      });
    } catch (error: any) {
      console.error('[handleVideo Error]:', error.message || error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Failed to process high-quality video. The requested resolution might not be available or YouTube is blocking the request.',
        });
      }
      if (await fs.pathExists(tempFilePath)) {
        await fs.remove(tempFilePath).catch(() => {});
      }
    }
  }
}
