import ytdl from '@distube/ytdl-core';

// Different client identities that YouTube recognizes
// Using multiple identities helps bypass bot detection
const CLIENTS = [
    'ANDROID',
    'IOS',
    'WEB',
    'MWEB',
    'TV'
] as const;

type YouTubeClient = typeof CLIENTS[number];

// Cache the selected client for the current request to ensure consistency
let currentClient: YouTubeClient = 'WEB';

export function getUnifiedOptions(clientOverride?: YouTubeClient) {
    const client = clientOverride || currentClient;
    const ua = getUserAgent(client);

    return {
        requestOptions: {
            headers: {
                'User-Agent': ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9',
                'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
            },
            // Disable IPv6 as it's often blocked by YouTube
            family: 4
        }
    };
}

export async function getYouTubeInfoWithRetry(url: string, retries = 3) {
    let lastError: any;

    for (let i = 0; i < retries; i++) {
        currentClient = CLIENTS[i % CLIENTS.length];
        try {
            console.log(`Attempting fetch with client: ${currentClient} (Attempt ${i + 1}/${retries})`);
            const options = getUnifiedOptions();
            return await ytdl.getInfo(url, options);
        } catch (error: any) {
            lastError = error;
            console.error(`Fetch failed with client ${currentClient}:`, error.message);
            if (error.message.includes('403') || error.message.includes('blocked')) {
                continue;
            }
            throw error;
        }
    }

    throw lastError;
}

function getUserAgent(client: YouTubeClient): string {
    switch (client) {
        case 'ANDROID':
            return 'com.google.android.youtube/19.29.37 (Linux; U; Android 14; en_US; Pixel 8 Pro; Build/AP1A.240505.005) Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36';
        case 'IOS':
            return 'com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X; en_US)';
        case 'TV':
            return 'Mozilla/5.0 (Chromecast; Google TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
        default:
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    }
}
