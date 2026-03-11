/**
 * Detects the platform from a given URL
 * @param url - The URL to detect the platform from
 * @returns The detected platform or null if not detected
 */
type Platform = 'youtube' | 'instagram' | 'tiktok' | 'facebook' | null;

export function detectPlatform(url: string): Platform {
  // Normalize URL by ensuring it has a protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    }

    // Instagram
    if (hostname.includes('instagram.com') || hostname.includes('instagr.am')) {
      return 'instagram';
    }

    // TikTok
    if (hostname.includes('tiktok.com') || hostname.includes('vm.tiktok.com')) {
      return 'tiktok';
    }

    // Facebook
    if (
      hostname.includes('facebook.com') ||
      hostname.includes('fb.com') ||
      hostname.includes('fb.watch')
    ) {
      return 'facebook';
    }

    // Add more platforms as needed

    // If no platform matches
    return null;
  } catch (error) {
    // Invalid URL format
    console.error('Invalid URL format:', error);
    return null;
  }
}
