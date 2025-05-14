// src/components/common/CallToAction.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = ({ 
  title, 
  description, 
  primaryButtonText, 
  primaryButtonLink, 
  secondaryButtonText, 
  secondaryButtonLink 
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 transform -skew-x-12"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-white opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          
          <p className="text-xl text-teal-100 mb-8">
            {description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={primaryButtonLink}
              className="px-8 py-3 bg-white text-teal-800 font-semibold rounded-lg shadow-lg hover:bg-teal-50 transition duration-300 text-lg"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              to={secondaryButtonLink}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-300 text-lg"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;