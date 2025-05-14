// src/pages/SubjectDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaAtom, FaFlask, FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaStar } from 'react-icons/fa';
import { fetchData } from '../services/api';
import { getAllTutors } from '../services/tutorService';

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        // Fetch subject
        const subjectData = await fetchData(`subjects/${subjectId}`);
        setSubject(subjectData);
        
        // Fetch tutors
        const tutorsData = await getAllTutors();
        
        // Filter tutors by subject
        const filteredTutors = tutorsData.filter(tutor => 
          tutor.subjects && tutor.subjects.some(s => 
            s.toLowerCase() === (subjectData?.name || '').toLowerCase()
          )
        );
        
        setTutors(filteredTutors || []);
        
        // Fetch resources for the subject
        const resourcesData = await fetchData('resources');
        const filteredResources = resourcesData 
          ? Object.values(resourcesData).filter(resource => 
              resource.subjectId === subjectId
            ) 
          : [];
        
        setResources(filteredResources);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subject data:', error);
        setLoading(false);
      }
    };
    
    fetchSubjectData();
  }, [subjectId]);
  
  // Subject icon mapping
  const getSubjectIcon = (subjectName) => {
    switch (subjectName?.toLowerCase()) {
      case 'mathematics':
        return <FaCalculator className="text-4xl" />;
      case 'physics':
        return <FaAtom className="text-4xl" />;
      case 'chemistry':
        return <FaFlask className="text-4xl" />;
      default:
        return <FaGraduationCap className="text-4xl" />;
    }
  };
  
  // Subject color mapping
  const getSubjectColorClass = (subjectName) => {
    switch (subjectName?.toLowerCase()) {
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
  
  // Placeholder data for subject details
  const subjectDetails = {
    mathematics: {
      description: 'Mathematics is the science of structure, order, and relation that has evolved from counting, measuring, and describing the shapes of objects. It deals with logical reasoning and quantitative calculation.',
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Linear Algebra', 'Differential Equations'],
      highSchool: {
        description: 'Our high school mathematics tutoring covers all aspects of the curriculum from basic algebra to advanced calculus, preparing students for exams and building a solid foundation for university studies.',
        topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Probability', 'Statistics']
      },
      university: {
        description: 'University-level mathematics tutoring focuses on advanced concepts and applications, helping students master the theoretical foundations and problem-solving techniques required for success in their courses.',
        topics: ['Advanced Calculus', 'Linear Algebra', 'Differential Equations', 'Abstract Algebra', 'Real Analysis', 'Complex Analysis', 'Numerical Methods']
      }
    },
    physics: {
      description: 'Physics is the natural science that studies matter, its motion and behavior through space and time, and the related entities of energy and force. It is one of the most fundamental scientific disciplines.',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Quantum Mechanics', 'Relativity'],
      highSchool: {
        description: 'High school physics tutoring covers the fundamental principles and applications, building intuition and problem-solving skills that form the basis for more advanced study.',
        topics: ['Mechanics', 'Waves', 'Thermodynamics', 'Electricity', 'Magnetism', 'Optics', 'Modern Physics']
      },
      university: {
        description: 'Our university physics tutoring delves into the mathematical formalism and conceptual understanding required for success in undergraduate and graduate physics courses.',
        topics: ['Classical Mechanics', 'Electrodynamics', 'Quantum Mechanics', 'Statistical Mechanics', 'Solid State Physics', 'Nuclear Physics', 'Particle Physics']
      }
    },
    chemistry: {
      description: 'Chemistry is the scientific study of the properties and behavior of matter. It is a natural science that covers the elements that make up matter to the compounds made of atoms, molecules and ions.',
      topics: ['General Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry'],
      highSchool: {
        description: 'High school chemistry tutoring focuses on building a strong understanding of the fundamental principles, chemical reactions, and laboratory techniques.',
        topics: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Stoichiometry', 'Acids and Bases', 'Redox Reactions', 'Organic Chemistry Basics']
      },
      university: {
        description: 'University chemistry tutoring covers advanced theoretical concepts and laboratory techniques required for success in undergraduate and graduate chemistry courses.',
        topics: ['Advanced Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry', 'Spectroscopy', 'Quantum Chemistry']
      }
    }
  };
  
  // Enhanced subject data
  const enhancedSubject = subject ? {
    ...subject,
    ...subjectDetails[subject.name.toLowerCase()] || {
      description: 'Expert tutoring in this subject for high school and university students.',
      topics: [],
      highSchool: {
        description: 'Comprehensive tutoring for high school students in this subject.',
        topics: []
      },
      university: {
        description: 'Advanced tutoring for university students in this subject.',
        topics: []
      }
    }
  } : null;
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading subject details...</div>
      </div>
    );
  }
  
  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Not Found</h2>
        <p className="text-gray-600 mb-6">The subject you're looking for doesn't exist or may have been removed.</p>
        <Link 
          to="/subjects" 
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Browse All Subjects
        </Link>
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
        {/* Subject Header */}
        <div className={`rounded-xl overflow-hidden bg-gradient-to-r ${getSubjectColorClass(subject.name)} mb-8`}>
          <div className="container mx-auto px-6 py-12 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/5 flex justify-center mb-6 md:mb-0">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  {getSubjectIcon(subject.name)}
                </div>
              </div>
              <div className="md:w-4/5 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
                <p className="text-xl text-white text-opacity-90 max-w-3xl">
                  {enhancedSubject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-800">Subject Overview</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {enhancedSubject.description}
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Topics</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {enhancedSubject.topics.map((topic, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <FaGraduationCap className="text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">High School Level</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {enhancedSubject.highSchool.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {enhancedSubject.highSchool.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <FaUserGraduate className="text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">University Level</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {enhancedSubject.university.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {enhancedSubject.university.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tutors Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-800">Tutors for {subject.name}</h2>
              </div>
              
              <div className="p-6">
                {tutors.length > 0 ? (
                  <div className="space-y-6">
                    {tutors.map((tutor) => (
                      <div key={tutor.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="md:w-1/4 h-48 md:h-auto">
                          <img 
                            src={tutor.profileImage || '/images/tutors/default-profile.jpg'} 
                            alt={tutor.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-3/4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
                            <div className="flex items-center text-yellow-500">
                              <FaStar className="mr-1" />
                              <span className="font-medium">{tutor.rating || 5.0}</span>
                              <span className="text-gray-400 text-sm ml-1">({tutor.reviewCount || 0})</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center text-gray-700 mb-1">
                              <FaGraduationCap className="mr-2 text-teal-600" />
                              <span className="text-sm">{tutor.education[0]}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <FaChalkboardTeacher className="mr-2 text-teal-600" />
                              <span className="text-sm">{tutor.currentRole}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {tutor.sellingPoints && tutor.sellingPoints[0]}
                          </p>
                          
                          <div className="flex space-x-3">
                            <Link 
                              to={`/tutors/${tutor.id}`}
                              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
                            >
                              View Profile
                            </Link>
                            <Link 
                              to={`/booking/${tutor.id}`}
                              className="px-4 py-2 border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium rounded-lg transition duration-300"
                            >
                              Book a Session
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaChalkboardTeacher className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No tutors available</h3>
                    <p className="text-gray-600 mb-6">
                      We currently don't have any tutors for this subject. Please check back later or explore other subjects.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            {/* Resources Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 sticky top-24">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-800">Learning Resources</h2>
              </div>
              
              <div className="p-6">
                {resources.length > 0 ? (
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={resource.thumbnailUrl || '/images/resources/default.jpg'} 
                            alt={resource.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              resource.isFree 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {resource.isFree ? 'Free' : 'Premium'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                          <Link 
                            to={`/resources/${resource.id}`}
                            className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium"
                          >
                            <FaBookOpen className="mr-1" />
                            View Resource
                          </Link>
                        </div>
                      </div>
                    ))}
                    
                    <Link 
                      to="/resources"
                      className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300 mt-4"
                    >
                      View All Resources
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FaBookOpen className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">No resources available</h3>
                    <p className="text-gray-600 mb-6">
                      We currently don't have any resources for this subject. Please check back later or explore other subjects.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-teal-600 rounded-xl shadow-md overflow-hidden text-white">
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Ready to Learn {subject.name}?</h2>
                <p className="text-teal-100 mb-6">
                  Book a session with one of our expert tutors and start improving your skills today.
                </p>
                <Link
                  to="/tutors"
                  className="block w-full py-2 px-4 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors duration-300"
                >
                  Find a Tutor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectDetailPage;