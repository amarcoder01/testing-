import React from 'react';
import { SpeedTestResult } from '../types/speedTest';
import EnhancedResultsDisplay from './EnhancedResultsDisplay';

interface ResultsDisplayProps {
  result: SpeedTestResult;
  onNewTest: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onNewTest }) => {
  return <EnhancedResultsDisplay result={result} onNewTest={onNewTest} />;
};

export default ResultsDisplay;