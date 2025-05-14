// src/components/common/Features.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUserCheck, 
  FaCalendar, 
  FaBookOpen, 
  FaChartLine, 
  FaLightbulb 
} from 'react-icons/fa';

const getFeatureIcon = (iconName) => {
  switch (iconName) {
    case 'graduation-cap':
      return <FaGraduationCap className="text-4xl" />;
    case 'user-check':
      return <FaUserCheck className="text-4xl" />;
    case 'calendar':
      return <FaCalendar className="text-4xl" />;
    case 'book-open':
      return <FaBookOpen className="text-4xl" />;
    case 'chart-line':
      return <FaChartLine className="text-4xl" />;
    case 'lightbulb':
      return <FaLightbulb className="text-4xl" />;
    default:
      return <FaGraduationCap className="text-4xl" />;
  }
};

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 rounded-xl p-6 text-center h-full hover:bg-gray-700 transition-colors duration-300"
    >
      <div className="text-teal-400 flex justify-center mb-4">
        {getFeatureIcon(feature.icon)}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
      
      <p className="text-gray-300">
        {feature.description}
      </p>
    </motion.div>
  );
};

const Features = ({ features }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  );
};

export default Features;