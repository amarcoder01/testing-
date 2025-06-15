import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Loader } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportGeneratorProps {
  result: SpeedTestResult;
}

// Export the generatePDFReport function directly so it can be imported elsewhere
export const generatePDFReport = async (result: SpeedTestResult, qrCodeDataUrl?: string) => {
  try {
    // Create a new PDF document with better quality settings
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15; // mm

    // Header with modern gradient effect
    pdf.setFillColor(59, 130, 246); // Blue base
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setFillColor(79, 70, 229); // Indigo accent
    pdf.rect(pageWidth - 35, 0, 35, 35, 'F');
    
    // Add logo-like element
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.circle(25, 17.5, 7, 'S');
    pdf.line(32, 17.5, 37, 17.5);
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('SpeedTest Pro Report', 45, 20);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Generated on ${new Date(result.timestamp).toLocaleString()}`, 45, 27);

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Results section with visual elements
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55); // Dark gray
    pdf.text('Test Results', margin, 45);

    // Draw result boxes with colored backgrounds - 2x2 grid for better layout
    const boxWidth = (pageWidth - (margin * 3)) / 2;
    const boxHeight = 25;
    const boxY = 50;
    
    // Download box
    pdf.setFillColor(209, 250, 229); // Light green
    pdf.roundedRect(margin, boxY, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(16, 185, 129); // Green
    pdf.setFontSize(18);
    pdf.text(`${result.downloadSpeed.toFixed(1)} Mbps`, margin + 5, boxY + 15);
    pdf.setTextColor(6, 95, 70); // Dark green
    pdf.setFontSize(12);
    pdf.text('Download', margin + 5, boxY + 8);
    
    // Upload box
    pdf.setFillColor(219, 234, 254); // Light blue
    pdf.roundedRect(margin * 2 + boxWidth, boxY, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(37, 99, 235); // Blue
    pdf.setFontSize(18);
    pdf.text(`${result.uploadSpeed.toFixed(1)} Mbps`, margin * 2 + boxWidth + 5, boxY + 15);
    pdf.setTextColor(30, 58, 138); // Dark blue
    pdf.setFontSize(12);
    pdf.text('Upload', margin * 2 + boxWidth + 5, boxY + 8);
    
    // Ping box
    pdf.setFillColor(254, 226, 226); // Light red
    pdf.roundedRect(margin, boxY + boxHeight + 5, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(220, 38, 38); // Red
    pdf.setFontSize(18);
    pdf.text(`${result.ping.toFixed(0)} ms`, margin + 5, boxY + boxHeight + 20);
    pdf.setTextColor(127, 29, 29); // Dark red
    pdf.setFontSize(12);
    pdf.text('Ping', margin + 5, boxY + boxHeight + 13);
    
    // Jitter box
    pdf.setFillColor(254, 243, 199); // Light yellow
    pdf.roundedRect(margin * 2 + boxWidth, boxY + boxHeight + 5, boxWidth, boxHeight, 3, 3, 'F');
    pdf.setTextColor(217, 119, 6); // Yellow
    pdf.setFontSize(18);
    pdf.text(`${result.jitter.toFixed(1)} ms`, margin * 2 + boxWidth + 5, boxY + boxHeight + 20);
    pdf.setTextColor(146, 64, 14); // Dark yellow
    pdf.setFontSize(12);
    pdf.text('Jitter', margin * 2 + boxWidth + 5, boxY + boxHeight + 13);

    // Additional details section
    pdf.setFillColor(243, 244, 246); // Light gray
    pdf.roundedRect(margin, boxY + (boxHeight * 2) + 15, pageWidth - (margin * 2), 35, 3, 3, 'F');
    
    pdf.setTextColor(31, 41, 55); // Dark gray
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Additional Details', margin + 5, boxY + (boxHeight * 2) + 25);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(75, 85, 99); // Medium gray
    const details = [
      `Server Location: ${result.serverLocation}`,
      `Test Duration: ${result.testDuration.toFixed(1)} seconds`,
      `Test Date: ${new Date(result.timestamp).toLocaleDateString()}`,
      `User Location: ${result.userLocation.city}, ${result.userLocation.country}`
    ];

    details.forEach((text, index) => {
      pdf.text(text, margin + 5, boxY + (boxHeight * 2) + 35 + (index * 8));
    });

    // Performance analysis with colored sections
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55); // Dark gray
    pdf.text('Performance Analysis', margin, boxY + (boxHeight * 2) + 60);

    // Analysis boxes
    const analysisY = boxY + (boxHeight * 2) + 65;
    
    // Download analysis
    let downloadColor = result.downloadSpeed > 25 ? '#10B981' : result.downloadSpeed > 10 ? '#FBBF24' : '#EF4444';
    pdf.setDrawColor(downloadColor);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin, analysisY, pageWidth - (margin * 2), 20, 3, 3, 'S');
    
    pdf.setTextColor(31, 41, 55);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const downloadAnalysis = `Your download speed of ${result.downloadSpeed.toFixed(1)} Mbps is ${result.downloadSpeed > 25 ? 'excellent' : result.downloadSpeed > 10 ? 'good' : 'below average'} for most online activities.`;
    const downloadLines = pdf.splitTextToSize(downloadAnalysis, pageWidth - (margin * 2) - 10);
    pdf.text(downloadLines, margin + 5, analysisY + 10);
    
    // Upload analysis
    let uploadColor = result.uploadSpeed > 10 ? '#10B981' : result.uploadSpeed > 5 ? '#FBBF24' : '#EF4444';
    pdf.setDrawColor(uploadColor);
    pdf.roundedRect(margin, analysisY + 25, pageWidth - (margin * 2), 20, 3, 3, 'S');
    
    const uploadAnalysis = `Upload speed of ${result.uploadSpeed.toFixed(1)} Mbps is ${result.uploadSpeed > 10 ? 'excellent' : result.uploadSpeed > 5 ? 'suitable' : 'limited'} for video conferencing and file sharing.`;
    const uploadLines = pdf.splitTextToSize(uploadAnalysis, pageWidth - (margin * 2) - 10);
    pdf.text(uploadLines, margin + 5, analysisY + 35);
    
    // Ping analysis
    let pingColor = result.ping < 20 ? '#10B981' : result.ping < 50 ? '#FBBF24' : '#EF4444';
    pdf.setDrawColor(pingColor);
    pdf.roundedRect(margin, analysisY + 50, pageWidth - (margin * 2), 20, 3, 3, 'S');
    
    const pingAnalysis = `Ping of ${result.ping.toFixed(0)}ms indicates ${result.ping < 20 ? 'excellent' : result.ping < 50 ? 'good' : 'poor'} responsiveness for gaming and real-time applications.`;
    const pingLines = pdf.splitTextToSize(pingAnalysis, pageWidth - (margin * 2) - 10);
    pdf.text(pingLines, margin + 5, analysisY + 60);
    
    // Jitter analysis
    let jitterColor = result.jitter < 5 ? '#10B981' : result.jitter < 15 ? '#FBBF24' : '#EF4444';
    pdf.setDrawColor(jitterColor);
    pdf.roundedRect(margin, analysisY + 75, pageWidth - (margin * 2), 20, 3, 3, 'S');
    
    const jitterAnalysis = `Jitter of ${result.jitter.toFixed(1)}ms indicates ${result.jitter < 5 ? 'excellent' : result.jitter < 15 ? 'acceptable' : 'poor'} connection stability for streaming and video calls.`;
    const jitterLines = pdf.splitTextToSize(jitterAnalysis, pageWidth - (margin * 2) - 10);
    pdf.text(jitterLines, margin + 5, analysisY + 85);

    // Footer with gradient
    pdf.setFillColor(243, 244, 246); // Light gray
    pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');
    
    pdf.setTextColor(107, 114, 128); // Gray
    pdf.setFontSize(8);
    pdf.text('Generated by SpeedTest Pro - Privacy-focused speed testing', margin, pageHeight - 15);
    pdf.text('No personal data collected or stored', margin, pageHeight - 10);
    pdf.text(`Report ID: ${result.id}`, margin, pageHeight - 5);

    // Add QR code if available
    if (qrCodeDataUrl) {
      try {
        pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - 35, pageHeight - 35, 25, 25);
        pdf.setFontSize(7);
        pdf.text('Scan to view results', pageWidth - 35, pageHeight - 5);
      } catch (qrError) {
        console.log('Error adding QR code to PDF', qrError);
      }
    } else {
      // Try to find QR code in the DOM as fallback
      try {
        const qrElement = document.querySelector('.bg-white.border.border-gray-200.rounded-lg img');
        if (qrElement) {
          const qrDataUrl = (qrElement as HTMLImageElement).src;
          pdf.addImage(qrDataUrl, 'PNG', pageWidth - 35, pageHeight - 35, 25, 25);
          pdf.setFontSize(7);
          pdf.text('Scan to view results', pageWidth - 35, pageHeight - 5);
        }
      } catch (qrError) {
        console.log('QR code not available for PDF', qrError);
      }
    }

    // Save the PDF
    pdf.save(`speedtest-report-${new Date().toISOString().split('T')[0]}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ result }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePDFGeneration = async () => {
    setIsGenerating(true);
    
    try {
      // Use the exported generatePDFReport function
      await generatePDFReport(result);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHTMLReport = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SpeedTest Pro Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 40px; text-align: center; }
          .header h1 { margin: 0; font-size: 2.5rem; font-weight: bold; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 40px; }
          .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
          .result-card { background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 24px; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0; }
          .result-value { font-size: 2rem; font-weight: bold; color: #1e293b; margin-bottom: 8px; }
          .result-label { color: #64748b; font-weight: 500; }
          .analysis { background: #f8fafc; padding: 24px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #3b82f6; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SpeedTest Pro Report</h1>
            <p>Generated on ${new Date(result.timestamp).toLocaleString()}</p>
          </div>
          <div class="content">
            <h2>Test Results</h2>
            <div class="results-grid">
              <div class="result-card">
                <div class="result-value">${result.downloadSpeed.toFixed(1)}</div>
                <div class="result-label">Mbps Download</div>
              </div>
              <div class="result-card">
                <div class="result-value">${result.uploadSpeed.toFixed(1)}</div>
                <div class="result-label">Mbps Upload</div>
              </div>
              <div class="result-card">
                <div class="result-value">${result.ping.toFixed(0)}</div>
                <div class="result-label">ms Ping</div>
              </div>
              <div class="result-card">
                <div class="result-value">${result.jitter.toFixed(1)}</div>
                <div class="result-label">ms Jitter</div>
              </div>
            </div>
            <div class="analysis">
              <h3>Performance Analysis</h3>
              <p>Your internet connection shows ${result.downloadSpeed > 25 ? 'excellent' : result.downloadSpeed > 10 ? 'good' : 'limited'} download performance at ${result.downloadSpeed.toFixed(1)} Mbps, which is ${result.downloadSpeed > 25 ? 'ideal for 4K streaming and large downloads' : result.downloadSpeed > 10 ? 'suitable for HD streaming and general browsing' : 'adequate for basic web browsing'}.</p>
              <p>Upload speed of ${result.uploadSpeed.toFixed(1)} Mbps is ${result.uploadSpeed > 10 ? 'excellent for video conferencing and file sharing' : 'suitable for basic uploads and video calls'}.</p>
              <p>Network latency of ${result.ping.toFixed(0)}ms indicates ${result.ping < 20 ? 'excellent responsiveness for gaming and real-time applications' : result.ping < 50 ? 'good performance for most online activities' : 'higher latency that may affect real-time applications'}.</p>
            </div>
          </div>
          <div class="footer">
            <p>Generated by SpeedTest Pro - Privacy-focused internet speed testing</p>
            <p>No personal data collected or stored during this test</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speedtest-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <FileText className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Download Report</h3>
          <p className="text-sm text-gray-600">Generate detailed performance reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handlePDFGeneration}
          disabled={isGenerating}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <div className="text-left">
            <div className="font-semibold">PDF Report</div>
            <div className="text-sm opacity-90">Professional format</div>
          </div>
        </button>

        <button
          onClick={generateHTMLReport}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Image className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">HTML Report</div>
            <div className="text-sm opacity-90">Interactive format</div>
          </div>
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Privacy Note:</strong> Reports are generated locally in your browser. 
          No data is sent to external servers.
        </p>
      </div>
    </motion.div>
  );
};

export default ReportGenerator;