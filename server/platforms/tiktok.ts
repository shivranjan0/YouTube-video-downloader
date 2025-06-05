const axios = require('axios');
const { load } = require('cheerio');
import { AxiosError } from 'axios';

interface TikTokResponse {
  url: string;
  type: string;
  filename: string;
}

export async function downloadFromTikTok(url: string, format: string): Promise<TikTokResponse> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.data) {
      throw new Error('Failed to fetch TikTok content');
    }

    const $ = load(response.data);
    
    // Find video data in the page
    const videoElement = $('video source').first();
    const videoUrl = videoElement.attr('src');
    const title = $('meta[property="og:title"]').attr('content') || 'tiktok-download';

    if (!videoUrl) {
      throw new Error('No video found in the TikTok post');
    }

    if (format === 'mp4') {
      return {
        url: videoUrl,
        type: 'video',
        filename: `${title}.mp4`
      };
    } else if (format === 'mp3') {
      // For MP3, we'll need to extract audio from the video
      return {
        url: videoUrl,
        type: 'audio',
        filename: `${title}.mp3`
      };
    }

    throw new Error('Unsupported format for TikTok');
  } catch (error: unknown) {
    console.error('TikTok download error:', error);
    
    if (error instanceof Error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('TikTok post not found');
      }
      if (axiosError.response?.status === 403) {
        throw new Error('Access to TikTok post is restricted');
      }
      throw new Error('Failed to download from TikTok: ' + error.message);
    }
    
    throw new Error('Failed to download from TikTok: Unknown error');
  }
} 