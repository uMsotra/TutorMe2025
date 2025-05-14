// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import logoTeal from '../../assets/images/logos/logo-white.png';
import logoWhite from '../../assets/images/logos/logo-teal.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();
  
  // Handle scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tutors', path: '/tutors' },
    { name: 'Subjects', path: '/subjects' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isScrolled ? logoTeal : logoWhite} 
              alt="TutorMe" 
              className="h-10 md:h-12"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-teal-600' 
                    : 'text-white hover:text-teal-200'
                } ${location.pathname === link.path ? 'border-b-2 border-teal-500' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-2 font-medium ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <FaUserCircle className="text-xl" />
                  <span>{userProfile?.name || 'User'}</span>
                </button>
                
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
                    >
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600"
                      >
                        Profile Settings
                      </Link>
                      <Link 
                        to="/bookings" 
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600"
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600"
                      >
                        <FaSignOutAlt className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-white hover:text-teal-200'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-teal-600 text-white hover:bg-teal-700' 
                      : 'bg-white text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? (
              <FaTimes className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <FaBars className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium py-2 border-b border-gray-100 ${
                      location.pathname === link.path 
                        ? 'text-teal-600' 
                        : 'text-gray-800 hover:text-teal-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {currentUser ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="font-medium py-2 border-b border-gray-100 text-gray-800 hover:text-teal-600"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="font-medium py-2 border-b border-gray-100 text-gray-800 hover:text-teal-600"
                    >
                      Profile Settings
                    </Link>
                    <Link 
                      to="/bookings" 
                      className="font-medium py-2 border-b border-gray-100 text-gray-800 hover:text-teal-600"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center font-medium py-2 text-gray-800 hover:text-teal-600"
                    >
                      <FaSignOutAlt className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Link 
                      to="/login"
                      className="w-full py-2 text-center font-medium border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      className="w-full py-2 text-center font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;