// src/components/common/Testimonials.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, index }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md p-6 relative"
    >
      {/* Quote icon */}
      <div className="absolute -top-4 -left-4 bg-teal-600 text-white p-3 rounded-full shadow-md">
        <FaQuoteLeft />
      </div>
      
      {/* Content */}
      <div className="pt-4">
        <div className="flex mb-4">
          {renderStars(testimonial.rating)}
        </div>
        
        <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
        
        <div className="flex items-center">
          <div className="mr-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.studentName.charAt(0)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{testimonial.studentName}</h4>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = ({ testimonials }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
      ))}
    </div>
  );
};

export default Testimonials;