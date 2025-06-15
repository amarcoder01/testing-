import React from 'react';
import { motion } from 'framer-motion';
import { X, Settings, Zap, Activity, Clock } from 'lucide-react';
import { TestConfig } from '../types/speedTest';

interface TestConfigPanelProps {
  config: TestConfig;
  onChange: (config: TestConfig) => void;
  onClose: () => void;
}

const TestConfigPanel: React.FC<TestConfigPanelProps> = ({ config, onChange, onClose }) => {
  const updateConfig = (updates: Partial<TestConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Test Configuration</h3>
            <p className="text-sm text-gray-600">Customize your speed test parameters</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Test Duration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Duration (seconds)</label>
          </div>
          <select
            value={config.duration}
            onChange={(e) => updateConfig({ duration: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 seconds</option>
            <option value={10}>10 seconds</option>
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
          </select>
        </div>

        {/* Parallel Connections */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Connections</label>
          </div>
          <select
            value={config.parallelConnections}
            onChange={(e) => updateConfig({ parallelConnections: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>1 connection</option>
            <option value={2}>2 connections</option>
            <option value={4}>4 connections</option>
            <option value={8}>8 connections</option>
          </select>
        </div>

        {/* Bufferbloat Analysis */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Bufferbloat Test</label>
          </div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enableBufferbloat}
              onChange={(e) => updateConfig({ enableBufferbloat: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable analysis</span>
          </label>
        </div>

        {/* Stress Testing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Stress Test</label>
          </div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enableStressTest}
              onChange={(e) => updateConfig({ enableStressTest: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable monitoring</span>
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Higher parallel connections may show faster speeds but use more bandwidth. 
          Bufferbloat testing helps identify network congestion issues.
        </p>
      </div>
    </motion.div>
  );
};

export default TestConfigPanel;