# Instagram Downloader (Demo)

A modern web application demonstrating an Instagram content downloader interface.

⚠️ **Important Note**: Due to Instagram's strict anti-scraping measures and frequent API changes, this application currently runs in demo mode. Real Instagram downloads require either Instagram's official API (which has limited access) or specialized proxy services to avoid rate limiting.

## Features

- ✅ Download Instagram Posts (Photos)
- ✅ Download Instagram Videos
- ✅ Download Instagram Reels
- ✅ Download Instagram Stories
- ✅ Download Carousel/Album posts
- ✅ No login required
- ✅ High-quality downloads
- ✅ Fast processing with caching
- ✅ Rate limiting for protection
- ✅ Mobile responsive design

## Tech Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Lucide Icons
- React 19

### Backend
- Node.js
- Express.js
- TypeScript
- btch-downloader (Instagram scraping)
- node-cache (Caching)
- express-rate-limit (Rate limiting)

## Installation

### Prerequisites
- Node.js 18+ and npm installed

### Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "IG downloader"
```

2. Install backend dependencies:
```bash
cd backend
npm install
cp .env.example .env
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

## API Endpoints

### POST /api/download
Download Instagram content

**Request Body:**
```json
{
  "url": "https://www.instagram.com/p/ABC123/"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "post",
    "media": [
      {
        "url": "media_url",
        "type": "image",
        "quality": "high"
      }
    ],
    "username": "username",
    "caption": "post caption",
    "timestamp": "2025-01-01T00:00:00.000Z"
  }
}
```

### GET /api/download/cache-stats
Get cache statistics

### GET /health
Health check endpoint

## Production Build

### Build Frontend
```bash
cd frontend
npm run build
npm run start
```

### Build Backend
```bash
cd backend
npm run build
npm run start
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Download endpoint: 20 requests per 15 minutes per IP

## Caching

- Cache TTL: 1 hour
- Max cache entries: 1000
- Automatic cleanup every 10 minutes

## Legal Notice

This tool is for educational purposes only. Users are responsible for complying with Instagram's Terms of Service and respecting intellectual property rights.

## License

MIT