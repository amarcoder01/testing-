import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserX, CheckCircle } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data and ensure complete anonymity.
            </p>
          </div>

          {/* Privacy Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: UserX,
                title: 'No Personal Data',
                desc: 'We never collect names, emails, or personal information'
              },
              {
                icon: Database,
                title: 'Local Storage Only',
                desc: 'Test results stored locally in your browser only'
              },
              {
                icon: Lock,
                title: 'Zero Tracking',
                desc: 'No cookies, analytics, or tracking scripts'
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <principle.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 space-y-8"
          >
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">What Data We Collect</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Network Performance Data</h3>
                    <p className="text-gray-600">Download speed, upload speed, ping, and jitter measurements for test functionality.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Approximate Location</h3>
                    <p className="text-gray-600">City and country (via IP geolocation) to select optimal test servers. No precise location data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Technical Information</h3>
                    <p className="text-gray-600">Browser type and basic device information for compatibility and optimization.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Data</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">Your data is used exclusively for:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Conducting accurate speed tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Selecting optimal test servers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Displaying your test results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Generating downloadable reports</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Data Protection & Anonymization</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Complete Anonymization</h3>
                  <p className="text-green-700 text-sm">
                    All data is immediately anonymized and cannot be traced back to individual users. 
                    We use advanced techniques to ensure your privacy is protected.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Local Storage</h3>
                  <p className="text-blue-700 text-sm">
                    Test history is stored locally in your browser only. You can clear this data 
                    anytime through your browser settings.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">No Third-Party Sharing</h3>
                  <p className="text-purple-700 text-sm">
                    We never share, sell, or transfer your data to third parties. Your information 
                    stays with us and is used solely for test functionality.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">GDPR Compliance</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Right to access your data</li>
                    <li>• Right to data portability</li>
                    <li>• Right to erasure</li>
                    <li>• Right to rectification</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">CCPA Compliance</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Right to know what data is collected</li>
                    <li>• Right to delete personal information</li>
                    <li>• Right to opt-out of data sales</li>
                    <li>• Right to non-discrimination</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact & Updates</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  This privacy policy was last updated on <strong>January 2024</strong>. 
                  We may update this policy to reflect changes in our practices or legal requirements.
                </p>
                <p className="text-gray-600">
                  For privacy-related questions or concerns, please contact us at{' '}
                  <a href="mailto:privacy@speedtestpro.com" className="text-blue-600 hover:underline">
                    privacy@speedtestpro.com
                  </a>
                </p>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;