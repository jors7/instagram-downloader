export interface MediaInfo {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  duration?: number;
  width?: number;
  height?: number;
  quality?: string;
}

export interface DownloadResponse {
  success: boolean;
  data?: {
    type: 'post' | 'reel' | 'story' | 'carousel';
    caption?: string;
    username?: string;
    media: MediaInfo[];
    timestamp?: string;
  };
  error?: string;
}

export interface InstagramPost {
  url: string;
  media: MediaInfo[];
  caption?: string;
  username?: string;
  timestamp?: string;
}