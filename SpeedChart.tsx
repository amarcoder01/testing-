import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { GraphData } from '../types/speedTest';

interface SpeedChartProps {
  data: GraphData[];
}

const SpeedChart: React.FC<SpeedChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Start test to see real-time graph</p>
      </div>
    );
  }

  const formatTime = (time: number) => `${(time / 1000).toFixed(1)}s`;

  return (
    <div className="w-full h-64 bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Speed</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            stroke="#6B7280"
          />
          <YAxis 
            label={{ value: 'Speed (Mbps)', angle: -90, position: 'insideLeft' }}
            stroke="#6B7280"
          />
          <Tooltip 
            labelFormatter={(time) => `Time: ${formatTime(time)}`}
            formatter={(speed: number) => [`${speed.toFixed(1)} Mbps`, 'Speed']}
          />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;