import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Wifi, Activity, AlertTriangle } from 'lucide-react';
import { SpeedTestResult, TestProgress as TestProgressType } from '../types/speedTest';
import SpeedTestEngine from '../utils/speedTestEngine';

interface CircularSpeedTestProps {
  onTestComplete?: (result: SpeedTestResult) => void;
}

const CircularSpeedTest: React.FC<CircularSpeedTestProps> = ({ onTestComplete }) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState<TestProgressType>({
    phase: 'idle',
    progress: 0,
    currentSpeed: 0,
    elapsedTime: 0
  });
  const [testResult, setTestResult] = useState<SpeedTestResult | null>(null);
  const [autoStarted, setAutoStarted] = useState(false);

  const handleProgressUpdate = useCallback((progress: TestProgressType) => {
    setTestProgress(progress);
  }, []);

  const startTest = async () => {
    setIsTestRunning(true);
    setTestResult(null);
    setTestProgress({
      phase: 'ping',
      progress: 0,
      currentSpeed: 0,
      elapsedTime: 0
    });

    try {
      const testEngine = new SpeedTestEngine(handleProgressUpdate, undefined, {
        duration: 10,
        parallelConnections: 4,
        enableBufferbloat: true,
        enableStressTest: false
      });
      
      const result = await testEngine.runSpeedTest();
      setTestResult(result);
      
      // Store result in localStorage
      const savedResults = JSON.parse(localStorage.getItem('speedTestResults') || '[]');
      savedResults.unshift(result);
      localStorage.setItem('speedTestResults', JSON.stringify(savedResults.slice(0, 20)));
      
      if (onTestComplete) {
        onTestComplete(result);
      }
    } catch (error) {
      console.error('Speed test failed:', error);
      setTimeout(() => startTest(), 2000);
    } finally {
      setIsTestRunning(false);
    }
  };

  // Auto-start test when component mounts
  useEffect(() => {
    if (!autoStarted && !isTestRunning && !testResult) {
      setAutoStarted(true);
      setTimeout(() => {
        startTest();
      }, 1000);
    }
  }, [autoStarted, isTestRunning, testResult]);

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'ping': return 'Testing Connection';
      case 'download': return 'Testing Download';
      case 'upload': return 'Testing Upload';
      case 'packetLoss': return 'Measuring Packet Loss';
      case 'complete': return 'Test Complete';
      default: return 'Initializing';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'ping': return 'text-blue-500';
      case 'download': return 'text-green-500';
      case 'upload': return 'text-orange-500';
      case 'packetLoss': return 'text-yellow-500';
      case 'complete': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getPhaseGradient = (phase: string) => {
    switch (phase) {
      case 'ping': return 'from-blue-400 to-blue-600';
      case 'download': return 'from-green-400 to-green-600';
      case 'upload': return 'from-orange-400 to-orange-600';
      case 'packetLoss': return 'from-yellow-400 to-yellow-600';
      case 'complete': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'ping': return <Wifi className="w-8 h-8 text-white" />;
      case 'download': return <Download className="w-8 h-8 text-white" />;
      case 'upload': return <Upload className="w-8 h-8 text-white" />;
      case 'packetLoss': return <AlertTriangle className="w-8 h-8 text-white" />;
      case 'complete': return <Activity className="w-8 h-8 text-white" />;
      default: return <Activity className="w-8 h-8 text-white" />;
    }
  };

  const calculateCircleProgress = (progress: number) => {
    const circumference = 2 * Math.PI * 120;
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Background blobs for aesthetic effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 0.8, 1],
              x: [0, -40, 40, 0],
              y: [0, 40, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        {/* Main circular progress */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Track circle */}
          <svg className="w-full h-full" viewBox="0 0 256 256">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`${testProgress.phase === 'ping' ? 'stop-color-blue-400' : testProgress.phase === 'download' ? 'stop-color-green-400' : 'stop-color-orange-400'}`} />
                <stop offset="100%" className={`${testProgress.phase === 'ping' ? 'stop-color-blue-600' : testProgress.phase === 'download' ? 'stop-color-green-600' : 'stop-color-orange-600'}`} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-100"
            />
            
            {/* Progress circle with glow effect */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={testProgress.phase === 'ping' ? '#3B82F6' : testProgress.phase === 'download' ? '#10B981' : '#F97316'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={calculateCircleProgress(testProgress.progress)}
              className="transition-all duration-300 ease-out"
              transform="rotate(-90 128 128)"
              filter="url(#glow)"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key="progress"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={isTestRunning ? { rotate: 360 } : { rotate: 0 }}
                  transition={isTestRunning ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                  className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 bg-gradient-to-r ${getPhaseGradient(testProgress.phase)}`}
                >
                  {getPhaseIcon(testProgress.phase)}
                </motion.div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {getPhaseLabel(testProgress.phase)}
                </h3>
                
                {testProgress.currentSpeed > 0 && testProgress.phase !== 'ping' && (
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                    {testProgress.currentSpeed.toFixed(1)}
                    <span className="text-xs sm:text-sm font-medium text-gray-500 ml-1">Mbps</span>
                  </div>
                )}
                
                {testProgress.phase === 'ping' && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularSpeedTest;