import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader - Download Instagram Stories',
  description: 'Download Instagram Stories anonymously. Save Instagram story photos and videos before they disappear. Free story downloader tool.',
  keywords: 'instagram story downloader, download instagram stories, story saver, instagram story viewer, save instagram stories',
};

export default function StoryPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instagram Story Downloader
              </h1>
              <p className="text-gray-600 text-center mb-12 text-lg">
                Download Instagram Stories Anonymously
              </p>
              <DownloadForm contentType="story" />

              <div className="mt-16 prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">How to Download Instagram Stories</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Open the Instagram story you want to save</li>
                  <li>Copy the story URL from your browser</li>
                  <li>Paste it into our downloader tool</li>
                  <li>Click Download to save the story</li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4">Instagram Story Downloader Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Download stories before they disappear (24 hours)</li>
                  <li>Save both photos and videos from stories</li>
                  <li>Anonymous downloading - no login required</li>
                  <li>High quality downloads</li>
                  <li>Download multiple stories at once</li>
                  <li>Works with story highlights too</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Why Download Instagram Stories?</h3>
                <p className="text-gray-700 mb-4">
                  Instagram Stories disappear after 24 hours. Our downloader helps you save memorable stories before they vanish. Whether it's a tutorial, announcement, or special moment, you can keep stories forever.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">Story Download Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Download stories within 24 hours of posting</li>
                  <li>Story highlights can be downloaded anytime</li>
                  <li>Respect privacy - only download public stories</li>
                  <li>Check story quality before downloading</li>
                </ul>
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