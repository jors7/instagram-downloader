import { Copy, Link, Download } from 'lucide-react';

const steps = [
  {
    icon: Copy,
    step: '1',
    title: 'Copy Instagram URL',
    description: 'Go to Instagram and copy the URL of the post, reel, or story you want to download',
  },
  {
    icon: Link,
    step: '2',
    title: 'Paste the URL',
    description: 'Paste the copied URL into our download box and click the download button',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download & Save',
    description: 'Choose your preferred quality and download the media to your device',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download Instagram content in 3 simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rotate-45" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}