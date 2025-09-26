import NavHeader from '@/components/NavHeader';
import DownloadForm from '@/components/DownloadForm';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instagram Photo Downloader
              </h1>
              <p className="text-gray-600 text-center mb-12 text-lg">
                Download Photos from Instagram
              </p>
              <DownloadForm contentType="photo" />
            </div>
          </div>
        </section>
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}