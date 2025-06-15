import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface BufferbloatAnalysisProps {
  isActive: boolean;
  rating?: string;
  latencyIncrease?: number;
}

const BufferbloatAnalysis: React.FC<BufferbloatAnalysisProps> = ({ isActive, rating, latencyIncrease }) => {
  const currentRating = rating || 'B';
  const currentLatencyIncrease = latencyIncrease || 0;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingIcon = (rating: string) => {
    if (rating === 'A' || rating === 'B') return CheckCircle;
    return AlertTriangle;
  };

  const RatingIcon = getRatingIcon(currentRating);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Activity className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Bufferbloat Analysis</h4>
          <p className="text-sm text-gray-600">Network congestion detection</p>
        </div>
      </div>

      {isActive ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4"
          >
            <Clock className="w-6 h-6 text-purple-600" />
          </motion.div>
          <p className="text-gray-600">Analyzing latency under load...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Rating</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getRatingColor(currentRating)}`}>
              <RatingIcon className="w-4 h-4" />
              <span className="font-semibold">{currentRating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Latency Increase</span>
            <span className="font-semibold text-gray-800">+{currentLatencyIncrease.toFixed(1)}ms</span>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>A-B:</strong> Excellent - No bufferbloat detected</p>
              <p><strong>C-D:</strong> Moderate - Some congestion present</p>
              <p><strong>F:</strong> Poor - Significant bufferbloat issues</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BufferbloatAnalysis;