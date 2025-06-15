import React from 'react';
import { SpeedTestResult } from '../types/speedTest';
import ModernShareModal from './ModernShareModal';

interface ShareModalProps {
  result: SpeedTestResult;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ result, onClose }) => {
  return <ModernShareModal result={result} onClose={onClose} />;
};

export default ShareModal;