// src/components/layout/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/images/background.jpg';

const Hero = ({ title, subtitle, ctaText, ctaLink, imageSrc }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20" // Restored opacity-20
        />
        <div className="absolute inset-0 bg-black/30"></div> // Restored dark overlay
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 transform -skew-x-12"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-20 h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left text-white mb-8 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white-600">
              {title}
            </h1>
            {/* <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-xl">
              {subtitle}
            </p> */}
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
              
              {/* Floating elements animation */}
              <motion.div 
                className="absolute -top-12 -right-8 w-16 h-16 bg-teal-300 rounded-full opacity-40"
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-0 -left-10 w-20 h-20 bg-teal-400 rounded-full opacity-30"
                animate={{ 
                  y: [0, 20, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;