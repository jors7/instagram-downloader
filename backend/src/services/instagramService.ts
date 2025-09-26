import { DownloadResponse, MediaInfo } from '../types';
import cacheService from './cacheService';
import axios from 'axios';

export class InstagramService {
  async downloadContent(url: string): Promise<DownloadResponse> {
    try {
      if (!this.isValidInstagramUrl(url)) {
        throw new Error('Invalid Instagram URL');
      }

      // Disable caching to always fetch fresh content
      // const cacheKey = cacheService.generateKey(url);
      // const cachedResult = cacheService.get<DownloadResponse>(cacheKey);

      // if (cachedResult) {
      //   console.log('Cache hit for URL:', url);
      //   return cachedResult;
      // }

      // Check if RapidAPI key is configured
      const apiKey = process.env.RAPIDAPI_KEY;
      if (!apiKey || apiKey === 'your_rapidapi_key_here') {
        console.log('RapidAPI key not configured, using demo mode');
        return this.getDemoContent(url);
      }

      try {
        // Use RapidAPI Instagram Downloader
        console.log('Fetching from RapidAPI for URL:', url);

        const options = {
          method: 'GET',
          url: `https://${process.env.RAPIDAPI_HOST}/convert`,
          params: { url },
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST || 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
          },
          timeout: 15000
        };

        const response = await axios.request(options);

        console.log('API Response:', JSON.stringify(response.data, null, 2));

        if (!response.data) {
          throw new Error('No data received from API');
        }

        // Check if API returned an error
        if (response.data.error) {
          console.log('API returned error:', response.data.error);
          return this.getDemoContent(url);
        }

        // Handle RapidAPI response format
        let media: MediaInfo[] = [];

        // Check for media array (main format from this API)
        if (response.data.media && Array.isArray(response.data.media)) {
          media = response.data.media.map((item: any) => ({
            url: item.url,
            type: item.type === 'video' ? 'video' : 'image',
            thumbnail: item.thumbnail,
            quality: item.quality || 'high'
          }));
        } else if (response.data.url) {
          // Single media item
          media = [{
            url: response.data.url,
            type: this.getMediaType(response.data.url),
            thumbnail: response.data.thumb || response.data.thumbnail,
            quality: 'high'
          }];
        } else if (response.data.urls && Array.isArray(response.data.urls)) {
          // Multiple URLs (for carousel posts)
          media = response.data.urls.map((urlItem: any) => ({
            url: typeof urlItem === 'string' ? urlItem : urlItem.url,
            type: this.getMediaType(typeof urlItem === 'string' ? urlItem : urlItem.url),
            thumbnail: response.data.thumb,
            quality: 'high'
          }));
        } else if (response.data.video) {
          // Video URL
          media = [{
            url: response.data.video,
            type: 'video',
            thumbnail: response.data.thumb || response.data.thumbnail,
            quality: 'high'
          }];
        } else if (response.data.image) {
          // Image URL
          media = [{
            url: response.data.image,
            type: 'image',
            thumbnail: response.data.thumb || response.data.thumbnail,
            quality: 'high'
          }];
        } else {
          // Try to extract any URL from the response
          const extractedUrls = this.extractUrlsFromResponse(response.data);
          if (extractedUrls.length > 0) {
            media = extractedUrls.map(url => ({
              url,
              type: this.getMediaType(url),
              quality: 'high'
            }));
          }
        }

        if (media.length === 0) {
          console.log('No media found in API response, falling back to demo');
          return this.getDemoContent(url);
        }

        const postType = this.getPostType(url);

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

        // Disable caching for now
        // cacheService.set(cacheKey, result);
        console.log('Successfully fetched result (caching disabled)');

        return result;

      } catch (apiError: any) {
        console.error('RapidAPI error:', apiError.response?.data || apiError.message);

        // Check if it's a rate limit or key issue
        if (apiError.response?.status === 403 || apiError.response?.status === 429) {
          console.log('API limit reached or invalid key, using demo mode');
        }

        return this.getDemoContent(url);
      }

    } catch (error: any) {
      console.error('Instagram download error:', error);
      return {
        success: false,
        error: error.message || 'Failed to download content'
      };
    }
  }

  private getDemoContent(url: string): DownloadResponse {
    const postType = this.getPostType(url);
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

  private extractUrlsFromResponse(data: any): string[] {
    const urls: string[] = [];

    // Recursively search for URLs in the response
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

    // Filter for media URLs
    return urls.filter(url =>
      url.includes('.jpg') ||
      url.includes('.jpeg') ||
      url.includes('.png') ||
      url.includes('.mp4') ||
      url.includes('instagram.com')
    );
  }

  private getMediaType(url: string): 'image' | 'video' {
    if (url.includes('.mp4') || url.includes('video') || url.includes('/v/')) {
      return 'video';
    }
    return 'image';
  }

  private isValidInstagramUrl(url: string): boolean {
    const patterns = [
      /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+/,
      /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+/,
      /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+/,
      /^https?:\/\/(www\.)?instagram\.com\/stories\/[A-Za-z0-9_.-]+\/[0-9]+/
    ];

    return patterns.some(pattern => pattern.test(url));
  }

  private getPostType(url: string): 'post' | 'reel' | 'story' | 'carousel' {
    if (url.includes('/reel/')) return 'reel';
    if (url.includes('/stories/')) return 'story';
    if (url.includes('/tv/')) return 'post';
    return 'post';
  }
}

export default new InstagramService();