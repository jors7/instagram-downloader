import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader - Download Instagram Reels Videos',
  description: 'Download Instagram Reels videos quickly and easily. Free Instagram Reels downloader with HD quality. Save Reels to your device without watermarks.',
  keywords: 'instagram reels downloader, download instagram reels, reels video downloader, save instagram reels, instagram reels saver',
};

export default function ReelsPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instagram Reels Downloader
              </h1>
              <p className="text-gray-600 text-center mb-12 text-lg">
                Download Reels Videos from Instagram
              </p>
              <DownloadForm contentType="reels" />

              <div className="mt-16 prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">How to Download Instagram Reels</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Open Instagram and find the Reel you want to download</li>
                  <li>Copy the Reel URL from the share option</li>
                  <li>Paste the URL in our downloader above</li>
                  <li>Click Download and save the video</li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4">Features of Our Reels Downloader</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Download Reels in HD quality</li>
                  <li>Keep original audio and video quality</li>
                  <li>No watermarks or branding added</li>
                  <li>Fast download speeds</li>
                  <li>Works on all devices - mobile and desktop</li>
                  <li>100% free with unlimited downloads</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Instagram Reels Download FAQ</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Can I download private Reels?</strong><br />
                  Our downloader only works with public Instagram Reels for privacy reasons.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Is it legal to download Instagram Reels?</strong><br />
                  Downloading content for personal use is generally acceptable, but respect copyright and creator rights.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}