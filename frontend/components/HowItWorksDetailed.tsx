'use client';

import { motion } from 'framer-motion';
import { ChartBarIcon, SparklesIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function HowItWorksDetailed() {
  const steps = [
    {
      number: 1,
      title: 'Find Content to Save',
      content: 'Browse Instagram and discover the content you want to keep forever. Whether it\'s an inspiring post, a tutorial reel, a memorable story, or a stunning carousel, our tool works with all Instagram content types.',
      additional: 'We support photos, videos, reels, stories, IGTV, and carousel posts — no content type is off-limits.',
      color: 'indigo',
      mockup: {
        title: 'Content Types Supported',
        items: ['Photos & Images', 'Reels & Videos', 'Stories (24h)', 'Carousel Posts'],
        indicator: '10M+ downloads'
      }
    },
    {
      number: 2,
      title: 'Paste & Process Instantly',
      content: 'Simply copy the Instagram URL and paste it into our downloader. Our advanced servers process the content in seconds, extracting the highest quality version available directly from Instagram\'s servers.',
      additional: 'No login required, 100% anonymous, and completely secure.',
      color: 'purple',
      mockup: {
        title: 'Processing Your Content',
        loading: true,
        progress: 85
      }
    },
    {
      number: 3,
      title: 'Preview & Choose Quality',
      content: 'Before downloading, preview your content and select the perfect quality for your needs. Get detailed information about:',
      additional: ['Resolution options', 'File size', 'Format (MP4, JPG)', 'Duration (for videos)', 'Number of items (for carousels)'],
      additionalText: 'It\'s like having complete control over your downloads — choose exactly what you need.',
      color: 'pink',
      mockup: {
        title: 'Quality Score',
        score: '1080p HD',
        features: ['Original Quality', 'No Watermarks']
      }
    },
    {
      number: 4,
      title: 'Download & Organize',
      content: 'Download your content with one click and organize it however you want. Save entire collections, create mood boards, archive memories, or build your content library.',
      additional: ['Save to your device instantly', 'Bulk download carousels', 'Keep stories before they disappear', 'Build your inspiration library'],
      additionalText: 'Your content, your way — downloaded and organized exactly how you want it.',
      color: 'blue',
      mockup: {
        title: 'Content Organizer',
        items: ['Download All', 'Select Individual', 'Create Folders']
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        numberBg: 'bg-gradient-to-br from-green-500 to-green-600',
        dot: 'bg-green-500'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-800',
        numberBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
        dot: 'bg-indigo-500'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        numberBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
        dot: 'bg-purple-500'
      },
      pink: {
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-800',
        numberBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
        dot: 'bg-pink-500'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        numberBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        dot: 'bg-blue-500'
      }
    };
    return colors[color] || colors.green;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How to Download and Save Instagram Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to save any Instagram content to your device
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line - Desktop Only */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-200 via-purple-400 to-pink-600"></div>

          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-16 ${index === steps.length - 1 ? 'mb-0' : ''}`}
              >
                <div className={`lg:flex items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={`lg:w-1/2 ${isReversed ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="flex items-start mb-4">
                      <div className={`${colors.numberBg} text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                        {step.number}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {step.content}
                    </p>

                    {Array.isArray(step.additional) ? (
                      <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                        {step.additional.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic mb-4">
                        {step.additional}
                      </p>
                    )}

                    {step.additionalText && (
                      <p className="text-gray-600 font-medium">
                        {step.additionalText}
                      </p>
                    )}
                  </div>

                  {/* Visual Mockup Side */}
                  <div className={`lg:w-1/2 mt-8 lg:mt-0 ${isReversed ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 shadow-lg`}>
                      {/* Browser Window Mock */}
                      <div className="bg-white rounded-lg shadow-inner p-4">
                        <div className="flex items-center mb-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-600">
                              instagram.com/downloader
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className={`font-semibold ${colors.text}`}>
                            {step.mockup.title}
                          </h4>

                          {step.mockup.loading && (
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                <span className="ml-3 text-gray-600">Processing...</span>
                              </div>
                              <div className="bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${step.mockup.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {step.mockup.items && (
                            <div className="space-y-2">
                              {step.mockup.items.map((item, i) => (
                                <div key={i} className="flex items-center">
                                  <div className={`w-2 h-2 ${colors.dot} rounded-full mr-2`}></div>
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {step.mockup.indicator && (
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <span className="text-gray-600">Downloads</span>
                              <span className={`font-bold ${colors.text}`}>{step.mockup.indicator}</span>
                            </div>
                          )}

                          {step.mockup.score && (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-800 mb-2">
                                {step.mockup.score}
                              </div>
                              <div className="flex justify-center space-x-4">
                                {step.mockup.features?.map((feature, i) => (
                                  <div key={i} className="flex items-center">
                                    <SparklesIcon className="w-4 h-4 text-pink-500 mr-1" />
                                    <span className="text-sm text-gray-600">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Timeline Dot - Desktop Only */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-4 h-4 ${colors.dot} rounded-full border-4 border-white shadow-lg`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}