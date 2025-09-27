import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import WhySection from '@/components/WhySection';
import HowItWorksDetailed from '@/components/HowItWorksDetailed';
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
            </div>
          </div>
        </section>
        <WhySection />
        <HowItWorksDetailed />
      </main>
      <Footer />
    </>
  );
}