# RapidAPI Setup Guide for Instagram Downloader

## Getting Your RapidAPI Key

1. **Sign up for RapidAPI**
   - Go to [RapidAPI.com](https://rapidapi.com)
   - Create a free account

2. **Subscribe to Instagram Downloader API**
   - Visit: [Instagram Downloader API](https://rapidapi.com/mrngstar/api/instagram-downloader-download-instagram-videos-stories1)
   - Click "Subscribe to Test"
   - Choose the free plan (usually allows 50-100 requests per month)

3. **Get Your API Key**
   - After subscribing, go to the "Endpoints" tab
   - Your API key will be shown in the code examples
   - Copy the `X-RapidAPI-Key` value

## Configuring the Application

1. **Update the .env file**
   ```bash
   cd backend
   nano .env  # or use your preferred editor
   ```

2. **Replace the placeholder with your actual key**
   ```env
   RAPIDAPI_KEY=your_actual_rapidapi_key_here
   ```

   Example:
   ```env
   RAPIDAPI_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

3. **Restart the backend server**
   ```bash
   npm run dev
   ```

## Testing the Integration

Once configured, the app will automatically use RapidAPI to download real Instagram content.

### Test with curl:
```bash
curl -X POST http://localhost:5001/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/p/YOUR_POST_ID/"}'
```

### Test in the web interface:
1. Open http://localhost:3001
2. Paste any Instagram URL
3. Click Download

## API Limits

- **Free Tier**: Usually 50-100 requests per month
- **Basic Tier**: $5-10/month for 1000+ requests
- **Pro Tier**: Higher limits for production use

## Alternative RapidAPI Instagram Services

If the primary API doesn't work, you can try these alternatives:

1. **Instagram Downloader by Prasadbro**
   - [API Link](https://rapidapi.com/prasadbro/api/instagram-downloader)
   - Update `RAPIDAPI_HOST` in .env to match the new host

2. **Instagram Media Downloader**
   - [API Link](https://rapidapi.com/social-api1/api/instagram-media-downloader)
   - May require slight code modifications for different response format

## Troubleshooting

### "Demo Mode" message appears
- Your API key is not configured correctly
- Check the .env file has the correct key

### 403 or 429 errors
- API rate limit reached
- Invalid API key
- Subscription expired

### No media found
- Instagram post might be private
- Post might be deleted
- Try a different Instagram URL

## Security Note

⚠️ **Never commit your API key to version control!**

The `.env` file should be in `.gitignore` to prevent exposing your API key.

## Need Help?

- Check RapidAPI dashboard for usage statistics
- Contact RapidAPI support for API issues
- Check the console logs for detailed error messages