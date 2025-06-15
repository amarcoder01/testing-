import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gauge, Shield, Mail, ChevronDown, Settings, History, HelpCircle, Github } from 'lucide-react';

const NewHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70"></div>
                <div className="relative">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpeedTest Pro
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={currentPath === '/'} icon={<Gauge className="w-4 h-4" />}>
              Speed Test
            </NavLink>
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button 
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors ${isDropdownOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                onClick={toggleDropdown}
              >
                <Settings className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    onMouseLeave={closeDropdown}
                  >
                    <Link 
                      to="/history" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      onClick={closeDropdown}
                    >
                      <History className="w-4 h-4" />
                      Test History
                    </Link>
                    <Link 
                      to="/network-guide" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      onClick={closeDropdown}
                    >
                      <HelpCircle className="w-4 h-4" />
                      Network Guide
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link 
                      to="/legacy" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      onClick={closeDropdown}
                    >
                      <Gauge className="w-4 h-4" />
                      Legacy Speed Test
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <NavLink to="/privacy" isActive={currentPath === '/privacy'} icon={<Shield className="w-4 h-4" />}>
              Privacy
            </NavLink>
            <NavLink to="/contact" isActive={currentPath === '/contact'} icon={<Mail className="w-4 h-4" />}>
              Contact
            </NavLink>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                <MobileNavLink to="/" isActive={currentPath === '/'} icon={<Gauge className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Speed Test
                </MobileNavLink>
                <MobileNavLink to="/history" isActive={currentPath === '/history'} icon={<History className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Test History
                </MobileNavLink>
                <MobileNavLink to="/network-guide" isActive={currentPath === '/network-guide'} icon={<HelpCircle className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Network Guide
                </MobileNavLink>
                <MobileNavLink to="/privacy" isActive={currentPath === '/privacy'} icon={<Shield className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Privacy
                </MobileNavLink>
                <MobileNavLink to="/contact" isActive={currentPath === '/contact'} icon={<Mail className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Contact
                </MobileNavLink>
                <MobileNavLink to="/legacy" isActive={currentPath === '/legacy'} icon={<Gauge className="w-5 h-5" />} onClick={closeMobileMenu}>
                  Legacy Speed Test
                </MobileNavLink>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, icon, children }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
  >
    {icon}
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, icon, children, onClick }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'} transition-colors`}
    onClick={onClick}
  >
    {icon}
    {children}
  </Link>
);

export default NewHeader;