// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTiktok, 
  FaInstagram, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import logoWhite from '../../assets/images/logos/logo-white.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* TutorMe Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logoWhite} alt="TutorMe" className="h-12" />
            </Link>
            <p className="text-gray-400 mb-6">
              Expert tutoring services for mathematics and science subjects since 2019. UCT-educated tutors helping students excel in their academic journey.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/tutorme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-teal-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://tiktok.com/@tutorme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-teal-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTiktok />
              </a>
              <a 
                href="https://instagram.com/tutorme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-teal-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/27785678863" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-teal-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Our Tutors
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subjects */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Subjects</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/subjects/mathematics" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link to="/subjects/physics" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Physics
                </Link>
              </li>
              <li>
                <Link to="/subjects/chemistry" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  Chemistry
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3" />
                <span className="text-gray-400">Cape Town, South Africa</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-teal-400 mr-3" />
                <a href="tel:+27785678863" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  +27 78 567 8863
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-teal-400 mr-3" />
                <a href="mailto:info@tutorme.co.za" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                  info@tutorme.co.za
                </a>
              </li>
              <li className="mt-6">
                <Link to="/contact" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300">
                  Send a Message
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TutorMe. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link to="/privacy-policy" className="hover:text-teal-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-teal-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;