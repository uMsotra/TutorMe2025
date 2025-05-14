// src/components/tutors/FeaturedTutors.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaGraduationCap, FaChalkboardTeacher, FaLanguage } from 'react-icons/fa';

const TutorCard = ({ tutor, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative pb-2/3 h-60 overflow-hidden">
        <img 
          src={tutor.profileImage || '/images/tutors/default-profile.jpg'} 
          alt={tutor.name} 
          className="absolute h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            <span className="font-medium">{tutor.rating || 5.0}</span>
            <span className="text-gray-400 text-sm ml-1">({tutor.reviewCount || 0})</span>
          </div>
        </div>
        
        <div className="text-gray-600 mb-4">
          <p className="font-medium">{tutor.subjects.join(' & ')}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700">
            <FaGraduationCap className="mr-2 text-teal-600" />
            <span className="text-sm">{tutor.education[0]}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaChalkboardTeacher className="mr-2 text-teal-600" />
            <span className="text-sm">{tutor.currentRole}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaLanguage className="mr-2 text-teal-600" />
            <span className="text-sm">{tutor.languages.join(' & ')}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Link 
            to={`/tutors/${tutor.id}`}
            className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedTutors = ({ tutors }) => {
  // Only display a maximum of 3 tutors for the featured section
  const featuredTutors = tutors.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredTutors.map((tutor, index) => (
        <TutorCard key={tutor.id} tutor={tutor} index={index} />
      ))}
    </div>
  );
};

export default FeaturedTutors;