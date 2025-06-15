import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, HelpCircle, Download, Upload, Clock, Activity, Lightbulb, Wifi, Zap } from 'lucide-react';

interface NetworkSpeedGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkSpeedGuide: React.FC<NetworkSpeedGuideProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                  <Wifi className="w-6 h-6 mr-2 text-blue-600" />
                  Network Speed Guide
                </h2>
                <motion.button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-5 sm:space-y-6">
                {/* What is a Speed Test */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-5 border border-blue-200 shadow-sm"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3 flex items-center">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    What is a Speed Test?
                  </h3>
                  <p className="text-sm sm:text-base text-blue-700">
                    A speed test measures your internet connection's performance by checking download speed, upload speed, and ping (latency). This helps you understand if you're getting the service you're paying for from your ISP.  
                  </p>
                </motion.div>
                
                {/* Speed Metrics Explained */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-amber-500" />
                    Speed Metrics Explained
                  </h3>
                  <div className="grid gap-3 sm:gap-4">
                    <motion.div 
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-3 shadow-sm">
                          <Download className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-800">Download Speed</h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 ml-13">
                        Measures how quickly data is transferred from the internet to your device. Higher is better for streaming videos, downloading files, and browsing websites.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-3 shadow-sm">
                          <Upload className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-800">Upload Speed</h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 ml-13">
                        Measures how quickly data is transferred from your device to the internet. Important for video calls, uploading files to cloud storage, and online gaming.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mr-3 shadow-sm">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-800">Ping (Latency)</h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 ml-13">
                        Measures the time it takes for data to travel from your device to a server and back. Lower is better, especially for online gaming and video calls.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-800">Jitter</h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 ml-13">
                        Measures the variation in ping over time. Lower jitter means a more stable connection, which is important for real-time applications like video calls and online gaming.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* What's a Good Speed */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
                    What's a Good Speed?
                  </h3>
                  <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">Web Browsing</td>
                          <td className="py-3 px-4 text-sm text-gray-600">1 Mbps</td>
                          <td className="py-3 px-4 text-sm text-gray-600">5+ Mbps</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">SD Video Streaming</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3 Mbps</td>
                          <td className="py-3 px-4 text-sm text-gray-600">5+ Mbps</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">HD Video Streaming</td>
                          <td className="py-3 px-4 text-sm text-gray-600">5 Mbps</td>
                          <td className="py-3 px-4 text-sm text-gray-600">10+ Mbps</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">4K Video Streaming</td>
                          <td className="py-3 px-4 text-sm text-gray-600">25 Mbps</td>
                          <td className="py-3 px-4 text-sm text-gray-600">35+ Mbps</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">Online Gaming</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3 Mbps, &lt;50ms ping</td>
                          <td className="py-3 px-4 text-sm text-gray-600">10+ Mbps, &lt;20ms ping</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">Video Calls</td>
                          <td className="py-3 px-4 text-sm text-gray-600">1 Mbps up/down</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3+ Mbps up/down</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">Large File Downloads</td>
                          <td className="py-3 px-4 text-sm text-gray-600">10 Mbps</td>
                          <td className="py-3 px-4 text-sm text-gray-600">50+ Mbps</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
                
                {/* Tips for Better Speed */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-4 sm:p-5 border border-green-200 shadow-sm"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3 sm:mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-500" />
                    Tips for Better Speed
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-green-800 list-disc pl-5">
                    <li>Position your router in a central location, away from walls and metal objects</li>
                    <li>Use a wired Ethernet connection when possible</li>
                    <li>Update your router's firmware regularly</li>
                    <li>Secure your Wi-Fi with a password to prevent unauthorized users</li>
                    <li>Consider upgrading your router if it's more than 3-4 years old</li>
                    <li>Close unused applications and limit the number of devices connected simultaneously</li>
                    <li>Contact your ISP if speeds are consistently below what you're paying for</li>
                  </ul>
                </motion.div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-b-2xl border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Remember that internet speed can vary based on many factors. If you've tried these tips and still experience issues, contact your ISP for assistance.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkSpeedGuide;