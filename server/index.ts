/**
 * VideoGrab Backend Server - Modern ESM Implementation
 * Latest library versions: express^5, @distube/ytdl-core^latest
 */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { YoutubeService } from './services/youtube';
import { detectPlatform } from '../src/utils/detectPlatform';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Services
const youtubeService = new YoutubeService();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev, restrict in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', version: '2.0.0', platform: process.platform });
});

app.post('/api/download', async (req, res) => {
  try {
    const { url, format, quality } = req.body;

    if (!url || !format) {
      return res.status(400).json({ error: 'URL and format are required' });
    }

    const platform = detectPlatform(url);
    console.log(`[Server] Processing ${platform} request: ${url}`);

    if (platform === 'youtube') {
      await youtubeService.handleDownload(url, format, quality, res);
    } else {
      // Future platforms (TikTok, Instagram, etc) can be implemented here
      res.status(400).json({ error: `Platform ${platform} support currently being updated.` });
    }

  } catch (error: any) {
    console.error('[Server Error]:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error.message || 'An unexpected error occurred during processing'
      });
    }
  }
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Fatal Error]:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Critical server error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`
  🚀 VideoGrab Backend v2.0
  -------------------------
  Main API: http://localhost:${PORT}
  Health:   http://localhost:${PORT}/health
  -------------------------
  `);
});