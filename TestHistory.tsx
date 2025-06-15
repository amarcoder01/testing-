import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';

interface TestHistoryProps {
  currentResult: SpeedTestResult;
}

const TestHistory: React.FC<TestHistoryProps> = ({ currentResult }) => {
  const savedResults = JSON.parse(localStorage.getItem('speedTestResults') || '[]') as SpeedTestResult[];
  const allResults = [currentResult, ...savedResults.filter(r => r.id !== currentResult.id)].slice(0, 10);

  const getTrend = (current: number, previous: number) => {
    const diff = ((current - previous) / previous) * 100;
    if (Math.abs(diff) < 5) return { icon: Minus, color: 'text-gray-500', text: 'No change' };
    if (diff > 0) return { icon: TrendingUp, color: 'text-green-500', text: `+${diff.toFixed(1)}%` };
    return { icon: TrendingDown, color: 'text-red-500', text: `${diff.toFixed(1)}%` };
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Test History</h3>
          <p className="text-sm text-gray-600">Your recent speed test results</p>
        </div>
      </div>

      {allResults.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No test history available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allResults.map((result, index) => {
            const isLatest = index === 0;
            const previousResult = allResults[index + 1];
            
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isLatest 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                    {isLatest && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{result.serverLocation}</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-800">
                        {result.downloadSpeed.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600">Mbps</span>
                      {previousResult && (
                        <div className="ml-2">
                          {(() => {
                            const trend = getTrend(result.downloadSpeed, previousResult.downloadSpeed);
                            return <trend.icon className={`w-4 h-4 ${trend.color}`} />;
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">Download</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-800">
                        {result.uploadSpeed.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600">Mbps</span>
                      {previousResult && (
                        <div className="ml-2">
                          {(() => {
                            const trend = getTrend(result.uploadSpeed, previousResult.uploadSpeed);
                            return <trend.icon className={`w-4 h-4 ${trend.color}`} />;
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">Upload</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-800">
                        {result.ping.toFixed(0)}
                      </span>
                      <span className="text-sm text-gray-600">ms</span>
                      {previousResult && (
                        <div className="ml-2">
                          {(() => {
                            const trend = getTrend(previousResult.ping, result.ping); // Inverted for ping (lower is better)
                            return <trend.icon className={`w-4 h-4 ${trend.color}`} />;
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">Ping</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Privacy Note:</strong> Test history is stored locally in your browser only. 
          No data is transmitted to external servers.
        </p>
      </div>
    </div>
  );
};

export default TestHistory;