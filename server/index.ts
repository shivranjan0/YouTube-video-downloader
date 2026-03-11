/**
 * VideoGrab Backend Server - Modern ESM Implementation
 */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { YoutubeService } from './services/youtube';
import { MailService } from './services/mailer';
import { detectPlatform } from './utils/detectPlatform';
import * as dotenv from 'dotenv';

// ESM polyfill for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Services
const youtubeService = new YoutubeService();
const mailService = new MailService();

// Middleware
app.use(
  cors({
    origin: '*', // Allow all origins for dev, restrict in production
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
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
      res.status(400).json({ error: `Platform ${platform} support currently being updated.` });
    }
  } catch (error: any) {
    console.error('[Server Error]:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error.message || 'An unexpected error occurred during processing',
      });
    }
  }
});

// Contact Route (SMTP)
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { from_name, from_email, subject, message } = req.body;

    if (!from_name || !from_email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    console.log(`[Server] Handling contact from: ${from_email}`);

    await mailService.sendContactMail(from_name, from_email, subject, message);

    res.json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error: any) {
    console.error('[Mail Server Error Details]:', error);
    res.status(500).json({
      error: 'Failed to send your message. Please try again later or email us directly.',
      details: error.message,
    });
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
  🚀 Audivio Backend Live
  -------------------------
  Main API: http://localhost:${PORT}
  Health:   http://localhost:${PORT}/health
  -------------------------
  `);
});
