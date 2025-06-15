import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface PacketLossCardProps {
  packetLoss: {
    percentage: number;
    sent: number;
    received: number;
  };
}

const PacketLossCard: React.FC<PacketLossCardProps> = ({ packetLoss }) => {
  // Determine the status based on packet loss percentage
  const getStatus = () => {
    if (packetLoss.percentage < 1) return 'excellent';
    if (packetLoss.percentage < 2.5) return 'good';
    if (packetLoss.percentage < 5) return 'fair';
    return 'poor';
  };

  const status = getStatus();

  // Get appropriate icon and color based on status
  const getStatusDetails = () => {
    switch (status) {
      case 'excellent':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          color: 'bg-green-500',
          textColor: 'text-green-500',
          label: 'Excellent'
        };
      case 'good':
        return {
          icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
          color: 'bg-blue-500',
          textColor: 'text-blue-500',
          label: 'Good'
        };
      case 'fair':
        return {
          icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
          color: 'bg-yellow-500',
          textColor: 'text-yellow-500',
          label: 'Fair'
        };
      case 'poor':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
          color: 'bg-red-500',
          textColor: 'text-red-500',
          label: 'Poor'
        };
      default:
        return {
          icon: <AlertCircle className="w-6 h-6 text-gray-500" />,
          color: 'bg-gray-500',
          textColor: 'text-gray-500',
          label: 'Unknown'
        };
    }
  };

  const { icon, color, textColor, label } = getStatusDetails();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <div className="flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">
        {packetLoss.percentage.toFixed(1)}<span className="text-lg font-medium">%</span>
      </div>
      <div className="text-gray-500 text-sm">Packet Loss</div>
      <div className={`mt-2 text-sm font-medium ${textColor}`}>{label}</div>
      
      {/* Explanation text */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        {status === 'excellent' || status === 'good' ? (
          "Your connection is stable with minimal packet loss."
        ) : status === 'fair' ? (
          "Some packets are being lost. May affect real-time applications."
        ) : (
          "High packet loss detected. Video calls and gaming may be affected."
        )}
      </div>
      
      {/* Additional stats */}
      <div className="mt-2 text-xs text-gray-400 flex justify-between w-full">
        <span>Sent: {packetLoss.sent}</span>
        <span>Received: {packetLoss.received}</span>
      </div>
    </motion.div>
  );
};

export default PacketLossCard;