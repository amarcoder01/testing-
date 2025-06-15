import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Upload, Wifi, RotateCcw, Share2, FileText, ArrowLeft, AlertTriangle } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import ModernShareModal from './ModernShareModal';
import PacketLossCard from './PacketLossCard';

const ResultsPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load test results from localStorage
    const loadResult = () => {
      try {
        const savedResults = JSON.parse(localStorage.getItem('speedTestResults') || '[]');
        const foundResult = savedResults.find((r: SpeedTestResult) => r.id === resultId);
        
        if (foundResult) {
          setResult(foundResult);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading test result:', error);
        setNotFound(true);
      }
    };

    if (resultId) {
      loadResult();
    } else {
      setNotFound(true);
    }
  }, [resultId]);

  const handleNewTest = () => {
    navigate('/');
  };

  const handleGeneratePdf = () => {
    setIsPdfLoading(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsPdfLoading(false);
    }, 1500);
  };

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

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6"
          >
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Result Not Found</h1>
          <p className="text-gray-600 mb-8">The test result you're looking for doesn't exist or has expired.</p>
          <motion.button
            onClick={handleNewTest}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium mx-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            Run New Test
          </motion.button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Speed Test
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Speed Test Results</h1>
          <p className="text-gray-600">
            Test completed on {formatDate(result.timestamp)}
          </p>
        </motion.div>

        {/* Results Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Test Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard 
              icon={<Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
              value={result.downloadSpeed}
              unit="Mbps"
              label="Download"
              color="bg-green-500"
            />
            <ResultCard 
              icon={<Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
              value={result.uploadSpeed}
              unit="Mbps"
              label="Upload"
              color="bg-blue-500"
            />
            <ResultCard 
              icon={<Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />}
              value={result.ping}
              unit="ms"
              label="Ping"
              color="bg-orange-500"
            />
            {result.packetLoss && (
              <PacketLossCard packetLoss={result.packetLoss} />
            )}
          </div>
        </motion.div>

        {/* Additional Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Test Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Server Location</p>
              <p className="font-medium">{result.serverLocation}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Your Location</p>
              <p className="font-medium">{result.userLocation.city}, {result.userLocation.country}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Test Duration</p>
              <p className="font-medium">{result.testDuration.toFixed(1)} seconds</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-1">Jitter</p>
              <p className="font-medium">{result.jitter.toFixed(1)} ms</p>
            </div>
            {result.bufferbloat && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-1">Bufferbloat Rating</p>
                <p className="font-medium">{result.bufferbloat.rating} ({result.bufferbloat.latencyIncrease.toFixed(1)} ms)</p>
              </div>
            )}
            {result.stability && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-1">Connection Stability</p>
                <p className="font-medium">{result.stability.score.toFixed(1)}%</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-300/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </motion.button>
            
            <motion.button
              onClick={handleGeneratePdf}
              disabled={isPdfLoading}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-300/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${isPdfLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={!isPdfLoading ? { scale: 1.03 } : {}}
              whileTap={!isPdfLoading ? { scale: 0.97 } : {}}
            >
              {isPdfLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Download PDF
                </>
              )}
            </motion.button>
            
            <motion.button
              onClick={handleNewTest}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg hover:shadow-blue-300/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RotateCcw className="w-5 h-5" />
              New Test
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && result && (
        <ModernShareModal result={result} onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

export default ResultsPage;