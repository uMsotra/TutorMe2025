// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-24 h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-teal-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;