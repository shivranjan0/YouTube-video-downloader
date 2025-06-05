import axios, { AxiosError } from 'axios';
const { load } = require('cheerio');

interface InstagramResponse {
  url: string;
  type: string;
  filename: string;
}

export async function downloadFromInstagram(url: string, format: string): Promise<InstagramResponse> {
  try {
    // Add user agent to avoid blocking
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.data) {
      throw new Error('Failed to fetch Instagram content');
    }

    const $ = load(response.data);
    
    // Find meta tags containing media information
    const videoUrl = $('meta[property="og:video"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content') || 'instagram-download';

    if (!videoUrl && !imageUrl) {
      throw new Error('No media found in the Instagram post');
    }

    if (format === 'mp4' && videoUrl) {
      return {
        url: videoUrl,
        type: 'video',
        filename: `${title}.mp4`
      };
    } else if ((format === 'jpg' || !videoUrl) && imageUrl) {
      return {
        url: imageUrl,
        type: 'image',
        filename: `${title}.jpg`
      };
    }

    throw new Error('Requested format not available for this Instagram post');
  } catch (error: unknown) {
    // First try to handle it as an AxiosError
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('Instagram post not found');
      }
      if (axiosError.response?.status === 403) {
        throw new Error('Access to Instagram post forbidden');
      }
      throw new Error(`Instagram API error: ${axiosError.message}`);
    }
    
    // If it's a regular error with a message
    if (error instanceof Error) {
      throw new Error(`Instagram download error: ${error.message}`);
    }
    
    // For unknown error types
    throw new Error('Unknown error occurred while downloading from Instagram');
  }
} 