import React from 'react';
import { TestProgress as TestProgressType } from '../types/speedTest';

interface TestProgressProps {
  progress: TestProgressType;
}

const TestProgress: React.FC<TestProgressProps> = ({ progress }) => {
  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'ping': return 'Testing Connection & Latency';
      case 'download': return 'Testing Download Speed';
      case 'upload': return 'Testing Upload Speed';
      case 'complete': return 'Test Complete';
      default: return 'Initializing Test';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'ping': return 'bg-blue-500';
      case 'download': return 'bg-green-500';
      case 'upload': return 'bg-orange-500';
      case 'complete': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseGradient = (phase: string) => {
    switch (phase) {
      case 'ping': return 'from-blue-400 to-blue-600';
      case 'download': return 'from-green-400 to-green-600';
      case 'upload': return 'from-orange-400 to-orange-600';
      case 'complete': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold text-gray-800">
          {getPhaseLabel(progress.phase)}
        </span>
        <span className="text-lg font-bold text-gray-600">
          {progress.progress.toFixed(0)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-500 ease-out bg-gradient-to-r ${getPhaseGradient(progress.phase)} shadow-sm`}
          style={{ width: `${progress.progress}%` }}
        />
      </div>
      
      {progress.currentSpeed > 0 && progress.phase !== 'ping' && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-baseline gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-gray-800">
              {progress.currentSpeed.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-gray-600">Mbps</span>
          </div>
        </div>
      )}

      {progress.phase === 'ping' && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Measuring network latency...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestProgress;