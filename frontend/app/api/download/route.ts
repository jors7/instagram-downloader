import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface MediaInfo {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  quality?: string;
}

interface DownloadResponse {
  success: boolean;
  data?: {
    type: 'post' | 'reel' | 'story' | 'carousel';
    media: MediaInfo[];
    username: string;
    caption: string;
    timestamp: string;
  };
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!isValidInstagramUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Instagram URL' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey || apiKey === 'your_rapidapi_key_here') {
      console.log('RapidAPI key not configured, using demo mode');
      return NextResponse.json(getDemoContent(url));
    }

    try {
      console.log('Fetching from RapidAPI for URL:', url);

      const options = {
        method: 'GET',
        url: `https://${process.env.RAPIDAPI_HOST}/convert`,
        params: { url },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': process.env.RAPIDAPI_HOST || 'instagram-scraper-api3.p.rapidapi.com'
        },
        timeout: 15000
      };

      const response = await axios.request(options);

      console.log('API Response:', JSON.stringify(response.data, null, 2));

      if (!response.data) {
        throw new Error('No data received from API');
      }

      if (response.data.error) {
        console.log('API returned error:', response.data.error);
        return NextResponse.json(getDemoContent(url));
      }

      let media: MediaInfo[] = [];

      if (response.data.media && Array.isArray(response.data.media)) {
        media = response.data.media.map((item: any) => ({
          url: item.url,
          type: item.type === 'video' ? 'video' : 'image',
          thumbnail: item.thumbnail,
          quality: item.quality || 'high'
        }));
      } else if (response.data.url) {
        media = [{
          url: response.data.url,
          type: getMediaType(response.data.url),
          thumbnail: response.data.thumb || response.data.thumbnail,
          quality: 'high'
        }];
      } else if (response.data.urls && Array.isArray(response.data.urls)) {
        media = response.data.urls.map((urlItem: any) => ({
          url: typeof urlItem === 'string' ? urlItem : urlItem.url,
          type: getMediaType(typeof urlItem === 'string' ? urlItem : urlItem.url),
          thumbnail: response.data.thumb,
          quality: 'high'
        }));
      } else if (response.data.video) {
        media = [{
          url: response.data.video,
          type: 'video',
          thumbnail: response.data.thumb || response.data.thumbnail,
          quality: 'high'
        }];
      } else if (response.data.image) {
        media = [{
          url: response.data.image,
          type: 'image',
          thumbnail: response.data.thumb || response.data.thumbnail,
          quality: 'high'
        }];
      } else {
        const extractedUrls = extractUrlsFromResponse(response.data);
        if (extractedUrls.length > 0) {
          media = extractedUrls.map(url => ({
            url,
            type: getMediaType(url),
            quality: 'high'
          }));
        }
      }

      if (media.length === 0) {
        console.log('No media found in API response, falling back to demo');
        return NextResponse.json(getDemoContent(url));
      }

      const postType = getPostType(url);

      const result: DownloadResponse = {
        success: true,
        data: {
          type: postType,
          media,
          username: response.data.username || response.data.author || 'instagram_user',
          caption: response.data.caption || response.data.description || '',
          timestamp: new Date().toISOString()
        }
      };

      return NextResponse.json(result);

    } catch (apiError: any) {
      console.error('RapidAPI error:', apiError.response?.data || apiError.message);

      if (apiError.response?.status === 403 || apiError.response?.status === 429) {
        console.log('API limit reached or invalid key, using demo mode');
      }

      return NextResponse.json(getDemoContent(url));
    }

  } catch (error: any) {
    console.error('Instagram download error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to download content'
      },
      { status: 500 }
    );
  }
}

function getDemoContent(url: string): DownloadResponse {
  const postType = getPostType(url);
  const isReel = url.includes('/reel/');

  const media: MediaInfo[] = [{
    url: isReel
      ? 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4'
      : 'https://picsum.photos/800/800',
    type: isReel ? 'video' : 'image',
    quality: 'high'
  }];

  return {
    success: true,
    data: {
      type: postType,
      media,
      username: 'demo_user',
      caption: 'Demo Mode: Configure your RapidAPI key to download real Instagram content. Get your key at rapidapi.com',
      timestamp: new Date().toISOString()
    }
  };
}

function extractUrlsFromResponse(data: any): string[] {
  const urls: string[] = [];

  const findUrls = (obj: any) => {
    if (!obj) return;

    if (typeof obj === 'string' && obj.includes('http')) {
      urls.push(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(findUrls);
    } else if (typeof obj === 'object') {
      Object.values(obj).forEach(findUrls);
    }
  };

  findUrls(data);

  return urls.filter(url =>
    url.includes('.jpg') ||
    url.includes('.jpeg') ||
    url.includes('.png') ||
    url.includes('.mp4') ||
    url.includes('instagram.com')
  );
}

function getMediaType(url: string): 'image' | 'video' {
  if (url.includes('.mp4') || url.includes('video') || url.includes('/v/')) {
    return 'video';
  }
  return 'image';
}

function isValidInstagramUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/stories\/[A-Za-z0-9_.-]+\/[0-9]+/
  ];

  return patterns.some(pattern => pattern.test(url));
}

function getPostType(url: string): 'post' | 'reel' | 'story' | 'carousel' {
  if (url.includes('/reel/')) return 'reel';
  if (url.includes('/stories/')) return 'story';
  if (url.includes('/tv/')) return 'post';
  return 'post';
}