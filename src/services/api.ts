import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface DownloadOptions {
  url: string;
  format: string;
  quality?: string;
  onProgress?: (progress: number) => void;
}


export async function downloadMedia({ url, format, quality, onProgress }: DownloadOptions): Promise<void> {
  try {
    const response = await axios.post(`${API_URL}/download`, {
      url,
      format,
      quality
    }, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percentCompleted);
        }
      }
    });

    // Create a blob URL and trigger download
    const blob = new Blob([response.data], {
      type: format === 'mp3' ? 'audio/mpeg' : 'video/mp4'
    });
    const blobUrl = window.URL.createObjectURL(blob);

    // Get filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'download.' + format;
    if (contentDisposition) {
      const matches = /filename="(.+)"/.exec(contentDisposition);
      if (matches && matches[1]) {
        filename = matches[1];
      }
    }

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // When responseType is 'blob', error bodies come back as Blobs — parse them
      const data = error.response.data;
      if (data instanceof Blob) {
        try {
          const text = await data.text();
          const parsed = JSON.parse(text);
          throw new Error(parsed.error || 'Download failed');
        } catch (parseErr) {
          // If parsing fails, rethrow the parse error if it's already an Error
          if (parseErr instanceof Error && parseErr.message !== 'Download failed') throw parseErr;
          throw new Error('Download failed');
        }
      }
      throw new Error(data?.error || 'Download failed');
    }
    throw new Error('Failed to connect to the server');
  }
}

export async function downloadFile(url: string, filename: string) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob'
    });

    // Create a blob URL and trigger download
    const blob = new Blob([response.data]);
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    throw new Error('Failed to download file');
  }
} 