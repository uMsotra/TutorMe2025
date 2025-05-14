// src/components/layout/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, ctaText, ctaLink, imageSrc }) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 transform -skew-x-12"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left text-white mb-8 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-xl">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to={ctaLink}
                className="px-8 py-3 bg-white text-teal-800 font-semibold rounded-lg shadow-lg hover:bg-teal-50 transition duration-300 text-lg"
              >
                {ctaText}
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-300 text-lg"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-teal-300 rounded-full opacity-20 blur-xl transform scale-110"></div>
              <img 
                src={imageSrc} 
                alt="TutorMe" 
                className="h-64 md:h-80 relative z-10 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-16 md:h-24" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="#ffffff" 
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28,75.93-35.24,145.94-18.65,209.7,36.57V0Z" 
            opacity=".5" 
            fill="#ffffff" 
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;