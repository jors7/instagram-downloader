'use client';

import { useState, useRef } from 'react';
import { Download, Loader2, AlertCircle, Copy, Check, X, ArrowLeft } from 'lucide-react';
import { cn, isValidInstagramUrl } from '@/lib/utils';

interface DownloadFormProps {
  contentType?: 'photo' | 'reels' | 'story' | 'carousel' | 'all';
}

export default function DownloadForm({ contentType = 'all' }: DownloadFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!url.trim()) {
      setError('Please enter an Instagram URL');
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError('Please enter a valid Instagram URL');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/download?t=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      console.log('API Response:', data);
      console.log('Media data:', data.data?.media);
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the content');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      setError('Failed to paste from clipboard');
    }
  };

  const handleClear = () => {
    setUrl('');
    setResult(null);
    setError(null);
    // Focus back on the input field
    inputRef?.current?.focus();
  };

  const handleDownload = (mediaUrl: string, index: number, type: string) => {
    // Use backend proxy to download the file
    // This bypasses CORS and forces download on all devices
    const proxyUrl = `http://localhost:5001/api/download/media?url=${encodeURIComponent(mediaUrl)}&type=${type}&index=${index + 1}&download=true`;

    // Create a hidden iframe to trigger download without opening new tab
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = proxyUrl;
    document.body.appendChild(iframe);

    // Remove iframe after download starts
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Instagram URL here..."
            className="w-full px-4 py-4 pr-24 text-lg border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            disabled={loading}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full py-4 px-6 text-white font-semibold rounded-lg transition-all",
            "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-xl"
          )}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </span>
          )}
        </button>
      </form>

      {result && result.media && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Download Media</h2>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {result.media.map((item: any, index: number) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-64 md:h-80 relative bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  {item.thumbnail ? (
                    <>
                      <img
                        src={`/api/proxy?url=${encodeURIComponent(item.thumbnail)}`}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          console.error('Image load error:', item.thumbnail);
                          // If proxy fails, try direct URL for fallback
                          if (!img.dataset.triedDirect && item.type === 'image') {
                            img.dataset.triedDirect = 'true';
                            // Try proxying the main image URL
                            img.src = `/api/proxy?url=${encodeURIComponent(item.url)}`;
                          } else {
                            // If both fail, show placeholder
                            img.style.display = 'none';
                          }
                        }}
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center">
                      {item.type === 'image' ? (
                        <>
                          <svg className="w-12 h-12 mx-auto text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600">Image {index + 1}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-12 h-12 mx-auto text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">Video {index + 1}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <button
                    onClick={() => handleDownload(item.url, index, item.type)}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Download {item.type === 'video' ? 'Video' : 'Image'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}