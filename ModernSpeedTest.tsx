import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Download, Upload, Wifi, RotateCcw, Activity, Zap, Share2, FileText, HelpCircle, Loader, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { SpeedTestResult, TestProgress as TestProgressType } from '../types/speedTest';
import SpeedTestEngine from '../utils/speedTestEngine';
import ModernShareModal from './ModernShareModal';
import NetworkSpeedGuide from './NetworkSpeedGuide';
import PacketLossCard from './PacketLossCard';
import CircularSpeedTest from './CircularSpeedTest';

interface ModernSpeedTestProps {
  onTestComplete?: (result: SpeedTestResult) => void;
}

const ModernSpeedTest: React.FC<ModernSpeedTestProps> = ({ onTestComplete }) => {
  const navigate = useNavigate();
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState<TestProgressType>({
    phase: 'idle',
    progress: 0,
    currentSpeed: 0,
    elapsedTime: 0
  });
  const [testResult, setTestResult] = useState<SpeedTestResult | null>(null);
  const [autoStarted, setAutoStarted] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSpeedGuideOpen, setIsSpeedGuideOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleProgressUpdate = useCallback((progress: TestProgressType) => {
    setTestProgress(progress);
  }, []);

  const startTest = async () => {
    setIsTestRunning(true);
    setTestResult(null);
    setTestProgress({
      phase: 'ping',
      progress: 0,
      currentSpeed: 0,
      elapsedTime: 0
    });

    try {
      const testEngine = new SpeedTestEngine(handleProgressUpdate, undefined, {
        duration: 10,
        parallelConnections: 4,
        enableBufferbloat: true,
        enableStressTest: false
      });
      
      const result = await testEngine.runSpeedTest();
      setTestResult(result);
      
      // Store result in localStorage
      const savedResults = JSON.parse(localStorage.getItem('speedTestResults') || '[]');
      savedResults.unshift(result);
      localStorage.setItem('speedTestResults', JSON.stringify(savedResults.slice(0, 20)));
      
      if (onTestComplete) {
        onTestComplete(result);
      }
      
      // Set flag to redirect to results page
      setShouldRedirect(true);
    } catch (error) {
      console.error('Speed test failed:', error);
      setTimeout(() => startTest(), 2000);
    } finally {
      setIsTestRunning(false);
    }
  };

  const resetTest = () => {
    setTestResult(null);
    setTestProgress({
      phase: 'idle',
      progress: 0,
      currentSpeed: 0,
      elapsedTime: 0
    });
    setAutoStarted(false);
    setShouldRedirect(false); // Reset redirect flag
    setTimeout(() => {
      startTest();
    }, 500);
  };

  // Auto-start test when component mounts
  useEffect(() => {
    if (!autoStarted && !isTestRunning && !testResult) {
      setAutoStarted(true);
      setTimeout(() => {
        startTest();
      }, 1000);
    }
  }, [autoStarted, isTestRunning, testResult]);
  
  // Redirect to results page when test is complete
  useEffect(() => {
    if (shouldRedirect && testResult && !isTestRunning) {
      // Short delay to ensure state is updated
      const redirectTimer = setTimeout(() => {
        navigate(`/results/${testResult.id}`);
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [shouldRedirect, testResult, isTestRunning, navigate]);

  // Result card component for each metric
  const ResultCard = ({ icon, value, unit, label, color }: { icon: React.ReactNode, value: number, unit: string, label: string, color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <div className={`p-2 sm:p-3 rounded-full mb-2 sm:mb-3 ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-baseline gap-1">
        {typeof value === 'number' ? value.toFixed(1) : value}
        <span className="text-xs sm:text-sm font-medium text-gray-500">{unit}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{label}</div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Main content area with two columns on larger screens */}
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
          {/* Left column - Test visualization */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Speed Test</h2>
              <CircularSpeedTest 
                onTestComplete={(result) => {
                  setTestResult(result);
                  if (onTestComplete) onTestComplete(result);
                }}
              />
              
              {/* Primary Action Button - Run Again */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex justify-center mt-6"
                >
                  <motion.button
                    onClick={resetTest}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-300/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Run Again
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Right column - Results and actions */}
          <div className="lg:w-1/2">
            <AnimatePresence>
              {testResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Results Cards */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Test Results</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <ResultCard 
                        icon={<Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
                        value={testResult.downloadSpeed}
                        unit="Mbps"
                        label="Download"
                        color="bg-green-500"
                      />
                      <ResultCard 
                        icon={<Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                        value={testResult.uploadSpeed}
                        unit="Mbps"
                        label="Upload"
                        color="bg-blue-500"
                      />
                      <ResultCard 
                        icon={<Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />}
                        value={testResult.ping}
                        unit="ms"
                        label="Ping"
                        color="bg-orange-500"
                      />
                      {testResult.packetLoss && (
                        <PacketLossCard packetLoss={testResult.packetLoss} />
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Actions</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-300/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.5)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Share2 className="w-5 h-5" />
                        Share Results
                      </motion.button>

                      <motion.button
                        onClick={async () => {
                          try {
                            // Show loading state
                            setIsPdfLoading(true);
                            
                            // Import the generatePDFReport function
                            const { generatePDFReport } = await import('./ReportGenerator');
                            
                            // Get QR code image if available
                            let qrCodeDataUrl: string | undefined;
                            const qrCodeImg = document.querySelector('.bg-white.border.border-gray-200.rounded-lg img') as HTMLImageElement;
                            if (qrCodeImg && qrCodeImg.complete) {
                              qrCodeDataUrl = qrCodeImg.src;
                            }
                            
                            // Call the generatePDFReport function with result and QR code
                            await generatePDFReport(testResult, qrCodeDataUrl);
                            toast.success('PDF report generated successfully!');
                          } catch (error) {
                            console.error('Error generating PDF report:', error);
                            toast.error('Failed to generate PDF. Please try again.');
                          } finally {
                            setIsPdfLoading(false);
                          }
                        }}
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${!isPdfLoading ? 'hover:shadow-lg hover:shadow-red-300/30' : 'opacity-80 cursor-not-allowed'}`}
                        whileHover={!isPdfLoading ? { scale: 1.03, boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.5)' } : {}}
                        whileTap={!isPdfLoading ? { scale: 0.97 } : {}}
                        disabled={isPdfLoading}
                      >
                        {isPdfLoading ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                        {isPdfLoading ? 'Generating...' : 'PDF Report'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Help Button - Fixed at bottom right */}
      <motion.button
        onClick={() => setIsSpeedGuideOpen(true)}
        className="fixed bottom-6 right-6 p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-10"
        whileHover={{ scale: 1.1, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && testResult && (
          <ModernShareModal 
            result={testResult} 
            onClose={() => setIsShareModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Network Speed Guide Modal */}
      <AnimatePresence>
        {isSpeedGuideOpen && (
          <NetworkSpeedGuide 
            isOpen={isSpeedGuideOpen}
            onClose={() => setIsSpeedGuideOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernSpeedTest;