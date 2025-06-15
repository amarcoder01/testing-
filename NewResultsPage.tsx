import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Wifi, RotateCcw, Share2, FileText, ArrowLeft, AlertTriangle, Activity, Clock, MapPin, Server, Globe, Zap, Award } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import ModernShareModal from './ModernShareModal';
import PacketLossCard from './PacketLossCard';
import toast from 'react-hot-toast';

const NewResultsPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'comparison'>('overview');

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
      toast.success('PDF report generated successfully!');
    }, 1500);
  };

  const handleShareResults = () => {
    setIsShareModalOpen(true);
  };

  // Result card component for each metric
  const ResultCard = ({ 
    icon, 
    value, 
    unit, 
    label, 
    color, 
    description 
  }: { 
    icon: React.ReactNode, 
    value: number, 
    unit: string, 
    label: string, 
    color: string,
    description?: string 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 flex flex-col relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 sm:p-3 rounded-full ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
        {description && (
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => toast.info(description, { duration: 5000 })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-baseline gap-1">
        {typeof value === 'number' ? value.toFixed(1) : value}
        <span className="text-xs sm:text-sm font-medium text-gray-500">{unit}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{label}</div>
    </motion.div>
  );

  const getPerformanceGrade = () => {
    if (!result) return { grade: 'N/A', color: 'text-gray-500', bg: 'bg-gray-100' };
    
    const downloadScore = Math.min(result.downloadSpeed / 100, 1) * 40;
    const uploadScore = Math.min(result.uploadSpeed / 50, 1) * 30;
    const pingScore = Math.max(0, (100 - result.ping) / 100) * 30;
    const totalScore = downloadScore + uploadScore + pingScore;

    if (totalScore >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (totalScore >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (totalScore >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (totalScore >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

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

  const performance = getPerformanceGrade();

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
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Speed Test Results</h1>
              <p className="text-gray-600 mt-1">
                Test completed on {formatDate(result.timestamp)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleNewTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                New Test
              </motion.button>
              <motion.button
                onClick={handleShareResults}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
              <motion.button
                onClick={handleGeneratePdf}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isPdfLoading}
              >
                {isPdfLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600"></div>
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                PDF Report
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('details')}
            >
              Detailed Metrics
            </button>
            <button
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'comparison' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('comparison')}
            >
              Comparison
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Performance Score */}
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className={`w-16 h-16 ${performance.bg} rounded-full flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${performance.color}`}>{performance.grade}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Performance Score</h3>
                        <p className="text-sm text-gray-600">Overall connection quality rating</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Your connection is {performance.grade === 'A+' || performance.grade === 'A' ? 'excellent' : 
                                          performance.grade === 'B' ? 'good' : 
                                          performance.grade === 'C' ? 'average' : 'below average'}
                      </span>
                    </div>
                  </div>

                  {/* Main Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <ResultCard 
                      icon={<Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
                      value={result.downloadSpeed}
                      unit="Mbps"
                      label="Download Speed"
                      color="bg-green-500"
                      description="The rate at which data is transferred from the internet to your device. Higher is better."
                    />
                    <ResultCard 
                      icon={<Upload className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />}
                      value={result.uploadSpeed}
                      unit="Mbps"
                      label="Upload Speed"
                      color="bg-orange-500"
                      description="The rate at which data is transferred from your device to the internet. Higher is better."
                    />
                    <ResultCard 
                      icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                      value={result.ping}
                      unit="ms"
                      label="Ping (Latency)"
                      color="bg-blue-500"
                      description="The time it takes for data to travel from your device to the server and back. Lower is better."
                    />
                  </div>

                  {/* Server Info */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-5 h-5 text-gray-500" />
                      <h3 className="font-medium text-gray-800">Test Server Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Server:</span>
                        <span className="font-medium text-gray-800">{result.serverLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Your Location:</span>
                        <span className="font-medium text-gray-800">{result.userLocation.city}, {result.userLocation.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Test Duration:</span>
                        <span className="font-medium text-gray-800">{result.testDuration} seconds</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Jitter Card */}
                    <ResultCard 
                      icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                      value={result.jitter}
                      unit="ms"
                      label="Jitter"
                      color="bg-purple-500"
                      description="Variation in ping over time. Lower jitter means a more stable connection."
                    />

                    {/* Packet Loss Card */}
                    {result.packetLoss && (
                      <ResultCard 
                        icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />}
                        value={result.packetLoss.percentage}
                        unit="%"
                        label="Packet Loss"
                        color="bg-yellow-500"
                        description="Percentage of data packets that fail to reach their destination. Lower is better."
                      />
                    )}

                    {/* Bufferbloat Card */}
                    {result.bufferbloat && (
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-purple-500" />
                          Bufferbloat Analysis
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Rating</span>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.bufferbloat.rating === 'A' ? 'bg-green-100 text-green-800' :
                            result.bufferbloat.rating === 'B' ? 'bg-blue-100 text-blue-800' :
                            result.bufferbloat.rating === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            result.bufferbloat.rating === 'D' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.bufferbloat.rating}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Latency Increase</span>
                          <span className="font-medium text-gray-800">{result.bufferbloat.latencyIncrease} ms</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          Bufferbloat occurs when your connection gets congested, causing delays. 
                          A lower rating indicates potential issues during heavy usage.
                        </p>
                      </div>
                    )}

                    {/* Stability Card */}
                    {result.stability && (
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-blue-500" />
                          Connection Stability
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Stability Score</span>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.stability.score >= 90 ? 'bg-green-100 text-green-800' :
                            result.stability.score >= 70 ? 'bg-blue-100 text-blue-800' :
                            result.stability.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.stability.score}/100
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Speed Variance</span>
                          <span className="font-medium text-gray-800">{result.stability.variance.toFixed(2)} Mbps</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          Stability measures how consistent your connection speed remains over time.
                          Lower variance means a more reliable connection.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Speed Comparison</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Compare your results with common internet activities and average speeds in your region.
                  </p>
                  
                  {/* Comparison Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-2xl mx-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Activity</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Required Speed</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Your Speed</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">Web Browsing</td>
                          <td className="px-4 py-3 text-sm text-gray-600">1 Mbps</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.downloadSpeed.toFixed(1)} Mbps</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Excellent
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">HD Video Streaming</td>
                          <td className="px-4 py-3 text-sm text-gray-600">5 Mbps</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.downloadSpeed.toFixed(1)} Mbps</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {result.downloadSpeed >= 5 ? 'Excellent' : 'Insufficient'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">4K Video Streaming</td>
                          <td className="px-4 py-3 text-sm text-gray-600">25 Mbps</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.downloadSpeed.toFixed(1)} Mbps</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.downloadSpeed >= 25 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {result.downloadSpeed >= 25 ? 'Good' : result.downloadSpeed >= 15 ? 'Marginal' : 'Insufficient'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">Online Gaming</td>
                          <td className="px-4 py-3 text-sm text-gray-600">Ping < 50ms</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.ping.toFixed(0)} ms</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.ping < 50 ? 'bg-green-100 text-green-800' : result.ping < 100 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {result.ping < 50 ? 'Excellent' : result.ping < 100 ? 'Good' : 'Poor'}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">Video Conferencing</td>
                          <td className="px-4 py-3 text-sm text-gray-600">3 Mbps up/down</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{Math.min(result.uploadSpeed, result.downloadSpeed).toFixed(1)} Mbps</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${Math.min(result.uploadSpeed, result.downloadSpeed) >= 3 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {Math.min(result.uploadSpeed, result.downloadSpeed) >= 3 ? 'Good' : 'Marginal'}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && result && (
          <ModernShareModal result={result} onClose={() => setIsShareModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewResultsPage;