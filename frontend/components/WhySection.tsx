'use client';

import { motion } from 'framer-motion';
import { SparklesIcon, UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function WhySection() {
  const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.2 }
  };

  const features = [
    {
      title: 'HD Quality Downloads',
      subtitle: 'Never lose quality again',
      description: 'Download photos, videos, and reels in their original high-definition quality'
    },
    {
      title: 'Bulk Download Support',
      subtitle: 'Save entire collections at once',
      description: 'Download carousels, multiple posts, and complete stories with one click'
    },
    {
      title: 'No Instagram Login Required',
      subtitle: '100% anonymous and secure',
      description: 'Your privacy matters - download content without exposing your account'
    },
    {
      title: 'Lightning Fast Processing',
      subtitle: 'Get your content in seconds',
      description: 'Advanced servers ensure instant downloads without waiting'
    },
    {
      title: 'All Content Types Supported',
      subtitle: 'Photos, Reels, Stories, IGTV',
      description: 'One tool for all your Instagram downloading needs'
    },
    {
      title: 'Mobile & Desktop Ready',
      subtitle: 'Download anywhere, anytime',
      description: 'Works perfectly on all devices and browsers'
    }
  ];

  const useCases = [
    {
      icon: SparklesIcon,
      title: 'Regular Instagram Users',
      description: 'Save memories and favorite content before it disappears',
      badge: '24/7 available',
      color: 'from-purple-500 to-purple-600',
      badgeColor: 'from-purple-500/40 to-purple-600/40',
      badgeTextColor: 'text-purple-700',
      cardGradient: 'from-purple-50 to-white'
    },
    {
      icon: UserIcon,
      title: 'Content Creators & Designers',
      description: 'Save inspiration and references for your creative projects',
      badge: '10M+ downloads',
      color: 'from-pink-500 to-pink-600',
      badgeColor: 'from-pink-500/40 to-pink-600/40',
      badgeTextColor: 'text-pink-700',
      cardGradient: 'from-pink-50 to-white'
    },
    {
      icon: DocumentTextIcon,
      title: 'Social Media Managers',
      description: 'Archive competitor content and track industry trends',
      badge: 'Used by 5000+ agencies',
      color: 'from-indigo-500 to-indigo-600',
      badgeColor: 'from-indigo-500/40 to-indigo-600/40',
      badgeTextColor: 'text-indigo-700',
      cardGradient: 'from-indigo-50 to-white'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Millions Trust Our Instagram Downloader
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save, collect, and organize Instagram content instantly. No login, no hassle, just pure download power.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - What You Get */}
          <motion.div {...fadeInLeft}>
            <h3 className="text-2xl font-bold mb-8 text-gray-800">What You Get</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-4 border-purple-500 pl-6 hover:border-purple-600 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                  <p className="text-purple-600 font-medium text-sm mb-1">{feature.subtitle}</p>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Perfect For */}
          <motion.div {...fadeInRight}>
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Perfect For...</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-pink-300 to-indigo-300"></div>

              <div className="space-y-8">
                {useCases.map((useCase, index) => {
                  const Icon = useCase.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative flex items-start pl-20"
                    >
                      {/* Icon circle */}
                      <div className={`absolute left-4 w-8 h-8 bg-gradient-to-br ${useCase.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      {/* Card */}
                      <div className={`bg-gradient-to-br ${useCase.cardGradient} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full`}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{useCase.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
                        <span className={`inline-block px-3 py-1 text-xs font-medium ${useCase.badgeTextColor} bg-gradient-to-r ${useCase.badgeColor} rounded-full`}>
                          {useCase.badge}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#download"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Try It Now - 100% Free Forever
          </a>
        </motion.div>
      </div>
    </section>
  );
}