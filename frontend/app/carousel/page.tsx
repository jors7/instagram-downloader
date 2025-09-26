import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader - Download Multiple Photos & Videos',
  description: 'Download all photos and videos from Instagram carousel posts. Save Instagram slideshows and multi-photo posts with our free carousel downloader.',
  keywords: 'instagram carousel downloader, download instagram carousel, instagram slideshow downloader, multi photo downloader, instagram album downloader',
};

export default function CarouselPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instagram Carousel Downloader
              </h1>
              <p className="text-gray-600 text-center mb-12 text-lg">
                Download All Photos & Videos from Carousel Posts
              </p>
              <DownloadForm contentType="carousel" />

              <div className="mt-16 prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">How to Download Instagram Carousel Posts</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Find the carousel post on Instagram (multi-photo/video post)</li>
                  <li>Copy the post URL</li>
                  <li>Paste it in our carousel downloader</li>
                  <li>Download all images and videos at once</li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4">Carousel Downloader Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Download up to 10 photos/videos from a single post</li>
                  <li>Get all carousel content with one click</li>
                  <li>Maintain original quality and order</li>
                  <li>Mix of photos and videos supported</li>
                  <li>Individual download buttons for each item</li>
                  <li>Preview all carousel content before downloading</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">What is an Instagram Carousel?</h3>
                <p className="text-gray-700 mb-4">
                  Instagram carousel posts allow users to share up to 10 photos or videos in a single post. Users can swipe through the content horizontally. Our downloader extracts all media from these multi-content posts.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">Benefits of Carousel Downloads</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Save complete photo series and collections</li>
                  <li>Download before/after transformations</li>
                  <li>Get all tutorial steps in one download</li>
                  <li>Save product showcases with multiple angles</li>
                  <li>Archive travel photo albums</li>
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