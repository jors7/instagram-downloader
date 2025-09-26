import { Download, Zap, Shield, Smartphone, Globe, Heart } from 'lucide-react';

const features = [
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Download photos, videos, reels, and stories in high quality',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Quick processing and instant download links',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'No login required, your privacy is protected',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Works perfectly on all devices and screen sizes',
  },
  {
    icon: Globe,
    title: 'No Restrictions',
    description: 'Download unlimited content without any limits',
  },
  {
    icon: Heart,
    title: '100% Free',
    description: 'Completely free to use, no hidden charges',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Instagram Downloader?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The best tool for downloading Instagram content with amazing features
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}