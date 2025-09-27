import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import WhySection from '@/components/WhySection';
import HowItWorksDetailed from '@/components/HowItWorksDetailed';
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