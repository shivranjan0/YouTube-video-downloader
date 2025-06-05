const axios = require('axios');
const { load } = require('cheerio');
import { AxiosError } from 'axios';

interface FacebookResponse {
  url: string;
  type: string;
  filename: string;
}

export async function downloadFromFacebook(url: string, format: string): Promise<FacebookResponse> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.data) {
      throw new Error('Failed to fetch Facebook content');
    }

    const $ = load(response.data);
    
    // Find video data in the page
    const videoUrl = $('meta[property="og:video"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content') || 'facebook-download';

    if (!videoUrl && !imageUrl) {
      throw new Error('No media found in the Facebook post');
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

    throw new Error('Requested format not available for this Facebook post');
  } catch (error: unknown) {
    console.error('Facebook download error:', error);
    
    if (error instanceof Error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('Facebook post not found');
      }
      if (axiosError.response?.status === 403) {
        throw new Error('Access to Facebook post is restricted');
      }
      throw new Error('Failed to download from Facebook: ' + error.message);
    }
    
    throw new Error('Failed to download from Facebook: Unknown error');
  }
} 