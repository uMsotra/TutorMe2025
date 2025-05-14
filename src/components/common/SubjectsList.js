// src/components/common/SubjectsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaAtom, FaFlask } from 'react-icons/fa';

const getSubjectIcon = (subject) => {
  switch (subject.toLowerCase()) {
    case 'mathematics':
      return <FaCalculator className="text-4xl mb-4" />;
    case 'physics':
      return <FaAtom className="text-4xl mb-4" />;
    case 'chemistry':
      return <FaFlask className="text-4xl mb-4" />;
    default:
      return <FaCalculator className="text-4xl mb-4" />;
  }
};

const SubjectCard = ({ subject, index }) => {
  const colorClasses = {
    mathematics: 'from-blue-500 to-blue-700',
    physics: 'from-red-500 to-red-700',
    chemistry: 'from-green-500 to-green-700'
  };
  
  const colorClass = colorClasses[subject.name.toLowerCase()] || 'from-teal-500 to-teal-700';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden shadow-lg"
    >
      <Link to={`/subjects/${subject.id}`}>
        <div className={`p-8 text-center text-white bg-gradient-to-br ${colorClass} hover:shadow-xl transition-all duration-300 h-full`}>
          {getSubjectIcon(subject.name)}
          <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
          <p className="text-white text-opacity-80 mb-4">
            Expert tutoring for all levels
          </p>
          <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-lg font-medium">
            Explore
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const SubjectsList = ({ subjects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {subjects.map((subject, index) => (
        <SubjectCard key={subject.id} subject={subject} index={index} />
      ))}
    </div>
  );
};

export default SubjectsList;