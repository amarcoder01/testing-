import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gauge, Shield, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Gauge className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpeedTest
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Accurate internet speed testing with detailed metrics and analysis to help you understand your connection quality.
            </p>
          </div>
          
          {/* Features Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  Speed Test
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" />
                  Network Diagnostics
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" />
                  Connection Monitoring
                </span>
              </li>
            </ul>
          </div>
          
          {/* Legal & Contact Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal & Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 sm:mb-0">
            © {currentYear} SpeedTest. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <motion.a 
              href="#"
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Terms
            </motion.a>
            <span className="text-gray-300">|</span>
            <motion.a 
              href="#"
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GDPR
            </motion.a>
            <span className="text-gray-300">|</span>
            <motion.a 
              href="#"
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cookies
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;