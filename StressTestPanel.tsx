import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Play, Pause, BarChart3 } from 'lucide-react';
import { NetworkStabilityData } from '../types/speedTest';

const StressTestPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stabilityData, setStabilityData] = useState<NetworkStabilityData[]>([]);

  const toggleStressTest = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      // Start stress test simulation
      const interval = setInterval(() => {
        const newData: NetworkStabilityData = {
          timestamp: Date.now(),
          downloadSpeed: Math.random() * 50 + 25,
          uploadSpeed: Math.random() * 20 + 10,
          ping: Math.random() * 30 + 15
        };
        setStabilityData(prev => [...prev.slice(-19), newData]);
      }, 2000);

      // Stop after 30 seconds for demo
      setTimeout(() => {
        clearInterval(interval);
        setIsRunning(false);
      }, 30000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Stress Testing</h4>
          <p className="text-sm text-gray-600">Long-term stability monitoring</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={toggleStressTest}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            isRunning 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Stop Test' : 'Start Stress Test'}
        </button>

        {stabilityData.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Stability Metrics</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-gray-800">
                  {stabilityData[stabilityData.length - 1]?.downloadSpeed.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Mbps Down</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-gray-800">
                  {stabilityData[stabilityData.length - 1]?.uploadSpeed.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Mbps Up</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-gray-800">
                  {stabilityData[stabilityData.length - 1]?.ping.toFixed(0)}
                </div>
                <div className="text-xs text-gray-600">ms Ping</div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              {stabilityData.length} measurements collected
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StressTestPanel;