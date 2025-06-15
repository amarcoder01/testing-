import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ModernSpeedTest from './components/ModernSpeedTest';
import NewSpeedTest from './components/NewSpeedTest';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactPage from './components/ContactPage';
import ResultsPage from './components/ResultsPage';
import NewResultsPage from './components/NewResultsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<NewSpeedTest />} />
            <Route path="/results/:resultId" element={<NewResultsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Legacy routes */}
            <Route path="/legacy" element={<ModernSpeedTest />} />
            <Route path="/legacy/results/:resultId" element={<ResultsPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Toast notifications */}
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;