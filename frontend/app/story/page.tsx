import { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import WhySection from '@/components/WhySection';
import HowItWorksDetailed from '@/components/HowItWorksDetailed';
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