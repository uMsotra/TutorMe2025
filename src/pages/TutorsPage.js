// src/pages/TutorsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaGraduationCap, FaChalkboardTeacher, FaLanguage, FaSearch, FaFilter } from 'react-icons/fa';
import { getAllTutors } from '../services/tutorService';
import { fetchData } from '../services/api';

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  useEffect(() => {
    const fetchTutorsData = async () => {
      try {
        // Fetch tutors
        const tutorsData = await getAllTutors();
        setTutors(tutorsData || []);
        
        // Fetch subjects for filtering
        const subjectsData = await fetchData('subjects');
        setSubjects(subjectsData ? Object.values(subjectsData) : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutors data:', error);
        setLoading(false);
      }
    };
    
    fetchTutorsData();
  }, []);
  
  // Filter tutors based on search and subject filter
  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tutor.subjects && tutor.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesSubject = selectedSubject === 'all' || 
                          (tutor.subjects && tutor.subjects.includes(selectedSubject));
    
    return matchesSearch && matchesSubject;
  });
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading tutors...</div>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Expert Tutors</h1>
        <p className="text-gray-600 mb-8">
          Find the perfect tutor for your academic needs. All our tutors are qualified professionals with proven teaching experience.
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
                placeholder="Search tutors by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="subject" className="sr-only">Filter by Subject</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tutor.profileImage || '/images/tutors/default-profile.jpg'} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
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
                      <FaGraduationCap className="mr-2 text-teal-600 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">{tutor.education[0]}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaChalkboardTeacher className="mr-2 text-teal-600 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">{tutor.currentRole}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaLanguage className="mr-2 text-teal-600 flex-shrink-0" />
                      <span className="text-sm">{tutor.languages.join(' & ')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 flex space-x-3">
                    <Link 
                      to={`/tutors/${tutor.id}`}
                      className="flex-grow text-center py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
                    >
                      View Profile
                    </Link>
                    <Link 
                      to={`/booking/${tutor.id}`}
                      className="flex-grow text-center py-2 px-4 border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium rounded-lg transition duration-300"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No tutors found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any tutors matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
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

export default TutorsPage;