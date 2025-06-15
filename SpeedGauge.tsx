import React from 'react';

interface SpeedGaugeProps {
  speed: number;
  maxSpeed: number;
  label: string;
  unit: string;
  color: string;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ speed, maxSpeed, label, unit, color }) => {
  const progress = Math.min(speed / maxSpeed, 1) * 100;
  
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-3">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
        {/* Background Circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${progress * 2.83} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Speed Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{speed.toFixed(1)}</span>
          <span className="text-xs sm:text-sm text-gray-500">{unit}</span>
        </div>
      </div>
      <span className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default SpeedGauge;