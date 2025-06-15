import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gauge, Shield, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Gauge className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpeedTest
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={currentPath === '/'} icon={<Gauge className="w-4 h-4" />}>
              Speed Test
            </NavLink>
            <NavLink to="/privacy" isActive={currentPath === '/privacy'} icon={<Shield className="w-4 h-4" />}>
              Privacy
            </NavLink>
            <NavLink to="/contact" isActive={currentPath === '/contact'} icon={<Mail className="w-4 h-4" />}>
              Contact
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-1">
                <MobileNavLink 
                  to="/" 
                  isActive={currentPath === '/'} 
                  icon={<Gauge className="w-5 h-5" />}
                  onClick={closeMobileMenu}
                >
                  Speed Test
                </MobileNavLink>
                <MobileNavLink 
                  to="/privacy" 
                  isActive={currentPath === '/privacy'} 
                  icon={<Shield className="w-5 h-5" />}
                  onClick={closeMobileMenu}
                >
                  Privacy
                </MobileNavLink>
                <MobileNavLink 
                  to="/contact" 
                  isActive={currentPath === '/contact'} 
                  icon={<Mail className="w-5 h-5" />}
                  onClick={closeMobileMenu}
                >
                  Contact
                </MobileNavLink>
              </div>
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
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, icon, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
    >
      {icon}
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, isActive, icon, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-3 rounded-lg flex items-center gap-2 text-base font-medium transition-colors ${isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
    >
      {icon}
      {children}
    </Link>
  );
};

export default Header;