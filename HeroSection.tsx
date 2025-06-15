import React from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Fast & Accurate <span className="text-blue-600">Internet Speed Test</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Test your connection speed with our advanced, privacy-focused speed test tool.
                Get detailed insights about your download, upload, ping, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => document.getElementById('speed-test')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Wifi size={20} />
                  Start Speed Test
                </button>
                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow border border-blue-200 hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative z-0">
            <div className="relative">
              <motion.div
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                animate={{
                  y: [0, 30, -30, 0],
                  x: [0, 30, -30, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.div
                className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                animate={{
                  y: [0, -40, 40, 0],
                  x: [0, -40, 40, 0],
                  scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.div
                className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                animate={{
                  y: [0, 50, -20, 0],
                  x: [0, -30, 30, 0],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src="/speedometer.svg" 
                alt="Speed Test Illustration"
                className="relative z-10 w-full max-w-lg mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/500x400?text=Speed+Test';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;