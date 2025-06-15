import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, QrCode, MessageCircle, Mail, Linkedin, Facebook, Download, FileText, Share2, Loader, Twitter } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

interface ModernShareModalProps {
  result: SpeedTestResult;
  onClose: () => void;
}

const ModernShareModal: React.FC<ModernShareModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState({
    pdf: false,
    image: false,
    copy: false
  });
  
  const shareUrl = `${window.location.origin}/results/${result.id}`;
  const shareText = `🚀 My internet speed test results:\n📥 ${result.downloadSpeed.toFixed(1)} Mbps download\n📤 ${result.uploadSpeed.toFixed(1)} Mbps upload\n⚡ ${result.ping.toFixed(0)}ms ping\n\nTest your speed at SpeedTest Pro!`;
  
  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(shareUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1F2937',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [shareUrl]);

  const copyToClipboard = async () => {
    try {
      setIsLoading(prevState => ({ ...prevState, copy: true }));
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    } finally {
      setIsLoading(prevState => ({ ...prevState, copy: false }));
    }
  };

  const shareOnPlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      email: `mailto:?subject=My Internet Speed Test Results&body=${encodedText}%0A%0A${encodedUrl}`
    };
    
    if (platform === 'email') {
      window.location.href = urls[platform as keyof typeof urls];
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=550,height=420');
    }
  };

  const downloadAsImage = async () => {
    try {
      setIsLoading(prevState => ({ ...prevState, image: true }));
      
      const resultElement = document.querySelector('.result-capture-area');
      if (!resultElement) {
        toast.error('Could not find result element to capture');
        return;
      }
      
      // Use better quality settings for the image
      const canvas = await html2canvas(resultElement as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const dataUrl = canvas.toDataURL('image/png', 1.0); // Use maximum quality
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `speedtest-results-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image. Please try again.');
    } finally {
      setIsLoading(prevState => ({ ...prevState, image: false }));
    }
  };

  const copyResultsAsText = async () => {
    try {
      setIsLoading(prevState => ({ ...prevState, copy: true }));
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Results copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy results as text:', error);
      toast.error('Failed to copy results');
    } finally {
      setIsLoading(prevState => ({ ...prevState, copy: false }));
    }
  };

  // Define handleShare function that was missing
  const handleShare = (platform: string) => {
    switch (platform) {
      case 'copy':
        copyToClipboard();
        break;
      case 'image':
        downloadAsImage();
        break;
      case 'twitter':
      case 'facebook':
      case 'linkedin':
      case 'email':
        shareOnPlatform(platform);
        break;
      default:
        console.error('Unknown platform:', platform);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl relative z-10 overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Share Your Results</h2>
                <motion.button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                {/* Result Summary - Moved to top for better visual hierarchy */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-5 rounded-xl border border-blue-100 result-capture-area">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4">Your Speed Test Results</h3>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-green-600 font-bold text-lg sm:text-2xl">{result.downloadSpeed.toFixed(1)}</div>
                      <div className="text-xs sm:text-sm text-gray-500">Mbps Down</div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-blue-600 font-bold text-lg sm:text-2xl">{result.uploadSpeed.toFixed(1)}</div>
                      <div className="text-xs sm:text-sm text-gray-500">Mbps Up</div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <div className="text-amber-600 font-bold text-lg sm:text-2xl">{result.ping.toFixed(0)}</div>
                      <div className="text-xs sm:text-sm text-gray-500">ms Ping</div>
                    </div>
                  </div>
                  {result.packetLoss !== undefined && (
                    <div className="mt-3 bg-white p-2 sm:p-3 rounded-lg shadow-sm text-center">
                      <div className="text-purple-600 font-bold text-base sm:text-lg">{result.packetLoss.toFixed(1)}%</div>
                      <div className="text-xs sm:text-sm text-gray-500">Packet Loss</div>
                    </div>
                  )}
                </div>
                
                {/* Share Options - Organized into categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Share on Social Media</h3>
                  <div className="grid grid-cols-4 gap-3">
                    <motion.button 
                      onClick={() => handleShare('twitter')} 
                      className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#f0f9ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="w-6 h-6 text-blue-400 mb-2" />
                      <span className="text-xs font-medium">Twitter</span>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleShare('facebook')} 
                      className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#f0f9ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-xs font-medium">Facebook</span>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleShare('linkedin')} 
                      className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#f0f9ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-6 h-6 text-blue-700 mb-2" />
                      <span className="text-xs font-medium">LinkedIn</span>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleShare('email')} 
                      className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#f0f9ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-6 h-6 text-gray-600 mb-2" />
                      <span className="text-xs font-medium">Email</span>
                    </motion.button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Save & Copy</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button 
                      onClick={() => handleShare('copy')} 
                      className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#faf5ff" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading.copy ? (
                        <Loader className="w-5 h-5 text-purple-600 animate-spin" />
                      ) : copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-purple-600" />
                      )}
                      <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleShare('image')} 
                      className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      whileHover={{ y: -2, backgroundColor: "#f0fff4" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading.image ? (
                        <Loader className="w-5 h-5 text-green-600 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5 text-green-600" />
                      )}
                      <span className="text-sm font-medium">Save Image</span>
                    </motion.button>
                  </div>
                </div>
                
                {/* QR Code */}
                {qrCodeUrl && (
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Scan to View Results</h3>
                    <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mb-2" />
                    <p className="text-xs text-gray-500 text-center">Scan with your phone camera</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernShareModal;