// src/pages/SubjectsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaAtom, FaFlask, FaSearch, FaGraduationCap, FaUserGraduate } from 'react-icons/fa';
import { fetchData } from '../services/api';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        // Fetch subjects
        const subjectsData = await fetchData('subjects');
        setSubjects(subjectsData ? Object.values(subjectsData) : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects data:', error);
        setLoading(false);
      }
    };
    
    fetchSubjectsData();
  }, []);
  
  // Subject icon mapping
  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return <FaCalculator className="text-4xl mb-4" />;
      case 'physics':
        return <FaAtom className="text-4xl mb-4" />;
      case 'chemistry':
        return <FaFlask className="text-4xl mb-4" />;
      default:
        return <FaGraduationCap className="text-4xl mb-4" />;
    }
  };
  
  // Subject color mapping
  const getSubjectColorClass = (subject) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return 'from-blue-500 to-blue-700';
      case 'physics':
        return 'from-red-500 to-red-700';
      case 'chemistry':
        return 'from-green-500 to-green-700';
      default:
        return 'from-teal-500 to-teal-700';
    }
  };
  
  // Filter subjects based on search and level
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all'; // Add proper level filtering when data available
    
    return matchesSearch && matchesLevel;
  });
  
  // Placeholder data for subject details
  const subjectDetails = {
    mathematics: {
      description: 'From algebra to calculus, our mathematics tutoring covers all aspects of high school and university-level mathematics.',
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Linear Algebra', 'Differential Equations'],
      highSchool: true,
      university: true
    },
    physics: {
      description: 'Master the principles of physics from mechanics to quantum physics with our expert tutors.',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Quantum Mechanics'],
      highSchool: true,
      university: true
    },
    chemistry: {
      description: 'Understand chemical principles and reactions with comprehensive chemistry tutoring for all levels.',
      topics: ['General Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry'],
      highSchool: true,
      university: true
    }
  };
  
  // Enhance subjects with additional details
  const enhancedSubjects = filteredSubjects.map(subject => ({
    ...subject,
    ...subjectDetails[subject.name.toLowerCase()] || {
      description: 'Expert tutoring in this subject for high school and university students.',
      topics: [],
      highSchool: true,
      university: true
    }
  }));
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading subjects...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Subjects</h1>
        <p className="text-gray-600 mb-8">
          Explore our range of subjects with expert tutoring from high school to university level.
        </p>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedLevel === 'all'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setSelectedLevel('high-school')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedLevel === 'high-school'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaGraduationCap className="inline-block mr-1" />
                  High School
                </button>
                <button
                  onClick={() => setSelectedLevel('university')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedLevel === 'university'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaUserGraduate className="inline-block mr-1" />
                  University
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enhancedSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className={`h-48 bg-gradient-to-br ${getSubjectColorClass(subject.name)} flex items-center justify-center text-white`}>
                  <div className="text-center">
                    {getSubjectIcon(subject.name)}
                    <h2 className="text-2xl font-bold">{subject.name}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {subject.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Key Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {subject.highSchool && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <FaGraduationCap className="mr-1" />
                        High School
                      </span>
                    )}
                    
                    {subject.university && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <FaUserGraduate className="mr-1" />
                        University
                      </span>
                    )}
                  </div>
                  
                  <Link
                    to={`/subjects/${subject.id}`}
                    className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
                  >
                    Explore Subject
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {enhancedSubjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No subjects found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any subjects matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SubjectsPage;