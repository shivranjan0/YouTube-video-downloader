const ytDlpPkg = require('yt-dlp-exec');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const path = require('path');

async function test() {
    const ytDlpPath = path.join(process.cwd(), '..', 'yt-dlp.exe');
    const ffmpegPath = ffmpeg.path;
    const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // A short video
    
    console.log('FFmpeg Path:', ffmpegPath);
    console.log('yt-dlp Path:', ytDlpPath);

    try {
        const ytDlp = ytDlpPkg.create(ytDlpPath);
        const formatString = 'bv*[height<=360][ext=mp4]+ba[ext=m4a]/b[height<=360][ext=mp4]';
        
        console.log('Starting download test...');
        const ytDlpProcess = ytDlp.exec(url, {
            format: formatString,
            output: '-',
            ffmpegLocation: ffmpegPath,
            noWarnings: true,
            noCheckCertificates: true,
        });

        let dataReceived = 0;
        ytDlpProcess.stdout.on('data', (chunk) => {
            dataReceived += chunk.length;
            if (dataReceived > 100000) {
                console.log('Received some data, stopping...');
                // We can't easily stop it without killing the process, but we know it's working
            }
        });

        ytDlpProcess.stderr.on('data', (data) => {
            console.log('Stderr:', data.toString());
        });

        ytDlpProcess.on('close', (code) => {
            console.log('Process closed with code:', code);
        });

        // Kill after 10 seconds if not finished
        setTimeout(() => {
            console.log('Test timeout, killing process...');
            ytDlpProcess.kill();
        }, 10000);

    } catch (err) {
        console.error('Error:', err);
    }
}

test();
