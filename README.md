# YouTube Video & Audio Downloader

A modern web application to download videos and audio from YouTube and other platforms. Built with React, TypeScript, Vite, and Node.js backend.

## Features

- Download videos and audio from YouTube
- Clean, responsive UI
- Fast downloads
- Cookie consent and privacy-friendly

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/shivranjan0/YouTube-video-downloader.git
cd youtube_video_audio_downloader
```

### 2. Install Dependencies

```
npm install
```

### 3. Run the Application
This project uses Vite for the frontend and a Node.js server for the backend.

#### Method 1: All-in-One (Recommended)
```bash
npm start
```
This runs both the frontend and backend concurrently.

#### Method 2: Manual (Separate Terminals)
**Start Backend:**
```bash
npm run server
```

**Start Frontend:**
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```text
├── src/                # React Frontend (Vite)
│   ├── components/     # UI Components
│   ├── pages/          # Page Views
│   ├── services/       # Frontend API Client
│   └── utils/          # Client Utilities
├── server/             # Node.js Backend (ESM)
│   ├── services/       # YouTube & Mail Logic
│   ├── utils/          # Backend Utilities
│   └── index.ts        # Entry Point
├── public/             # Static Assets
├── yt-dlp.exe          # Core Download Engine
└── package.json        # Dependencies & Scripts
```

## Available Scripts

- `npm run dev` — Start the frontend in development mode
- `npm run build` — Build the frontend for production
- `npm run preview` — Preview the production build

## Troubleshooting

- Ensure Node.js and npm are installed and up to date
- If ports are in use, change them in `vite.config.ts` or server config
- For permission errors, try running commands as administrator

## License

MIT

---

Feel free to open issues or contribute to this project!
