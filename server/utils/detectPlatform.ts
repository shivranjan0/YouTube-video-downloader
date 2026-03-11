export function detectPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  // Add support for other platforms (e.g., TikTok, Instagram) here in the future
  return 'unknown';
}
