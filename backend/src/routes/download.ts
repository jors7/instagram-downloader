import { Router } from 'express';
import instagramService from '../services/instagramService';
import cacheService from '../services/cacheService';
import { rateLimiter } from '../middleware/rateLimiter';
import axios from 'axios';

const router = Router();

router.post('/', rateLimiter, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    const result = await instagramService.downloadContent(url);

    if (!result.success) {
      return res.status(400).json(result);
    }

    // Set no-cache headers to prevent browser caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json(result);
  } catch (error: any) {
    console.error('Download route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Download endpoint is working'
  });
});

router.get('/cache-stats', (req, res) => {
  res.json({
    success: true,
    stats: cacheService.getStats()
  });
});

// Download endpoint to bypass CORS and force download
router.get('/media', async (req, res) => {
  try {
    const mediaUrl = req.query.url as string;
    const type = req.query.type as string || 'image';
    const index = req.query.index || '1';
    const download = req.query.download === 'true'; // Check if it's a download request

    if (!mediaUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the media from Instagram with proper headers
    const response = await axios.get(mediaUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.instagram.com/'
      },
      timeout: 30000
    });

    // Determine file extension and content type
    const extension = type === 'video' ? 'mp4' : 'jpg';
    const contentType = type === 'video' ? 'video/mp4' : 'image/jpeg';

    // Set headers based on whether it's a download or display request
    res.setHeader('Content-Type', contentType);

    if (download) {
      // Force download for download button clicks
      res.setHeader('Content-Disposition', `attachment; filename="instagram_${type}_${index}.${extension}"`);
    } else {
      // Inline display for thumbnails
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache thumbnails for 1 hour
    }

    res.setHeader('Content-Length', response.data.length);

    // Send the file
    res.send(Buffer.from(response.data));
  } catch (error: any) {
    console.error('Download proxy error:', error.message);

    // If Instagram blocks us, return a more specific error
    if (error.response?.status === 403) {
      res.status(403).json({ error: 'Instagram blocked the download. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Failed to download media' });
    }
  }
});

export default router;