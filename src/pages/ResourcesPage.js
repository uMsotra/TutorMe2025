// src/pages/ResourcesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBookOpen, FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';
import { fetchData } from '../services/api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ResourceCard = ({ resource }) => {
  // Determine the file icon based on the resource title or type
  const getFileIcon = (resource) => {
    const title = resource.title.toLowerCase();
    if (title.includes('pdf') || title.includes('paper')) {
      return <FaFilePdf className="text-red-500" />;
    } else if (title.includes('excel') || title.includes('worksheet')) {
      return <FaFileExcel className="text-green-600" />;
    } else if (title.includes('word') || title.includes('document')) {
      return <FaFileWord className="text-blue-600" />;
    }
    return <FaBookOpen className="text-teal-600" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={resource.thumbnailUrl || '/images/resources/default.jpg'} 
          alt={resource.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            resource.isFree 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {resource.isFree ? 'Free' : 'Premium'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 mr-3">
            {getFileIcon(resource)}
          </div>
          <h3 className="font-bold text-gray-800 truncate">{resource.title}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
        
        <div className="mt-auto">
          <Link 
            to={`/resources/${resource.id}`}
            className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
          >
            {resource.isFree ? 'View Resource' : 'Purchase Access'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ResourcesPage = () => {
  const { currentUser, userProfile } = useAuth();
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        // Fetch resources
        const resourcesData = await fetchData('resources');
        setResources(resourcesData ? Object.values(resourcesData) : []);
        
        // Fetch subjects for filtering
        const subjectsData = await fetchData('subjects');
        setSubjects(subjectsData ? Object.values(subjectsData) : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resources data:', error);
        setLoading(false);
      }
    };
    
    fetchResourcesData();
  }, []);
  
  // Filter resources based on search term, subject, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || resource.subjectId === selectedSubject;
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'free' && resource.isFree) || 
                       (selectedType === 'premium' && !resource.isFree);
    
    return matchesSearch && matchesSubject && matchesType;
  });
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading resources...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Resources</h1>
          <p className="text-gray-600 mb-8">
            Access a wide range of study materials, practice papers, and learning resources to help you excel in your studies.
          </p>
          
          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              {/* Subject Filter */}
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
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Type Filter */}
              <div className="w-full md:w-48">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 p-1">
                    <Tab
                      onClick={() => setSelectedType('all')}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-md py-2 text-sm font-medium leading-5',
                          'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                          selected
                            ? 'bg-white shadow text-teal-600'
                            : 'text-gray-700 hover:bg-white/[0.12] hover:text-teal-600'
                        )
                      }
                    >
                      All
                    </Tab>
                    <Tab
                      onClick={() => setSelectedType('free')}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-md py-2 text-sm font-medium leading-5',
                          'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                          selected
                            ? 'bg-white shadow text-teal-600'
                            : 'text-gray-700 hover:bg-white/[0.12] hover:text-teal-600'
                        )
                      }
                    >
                      Free
                    </Tab>
                    <Tab
                      onClick={() => setSelectedType('premium')}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-md py-2 text-sm font-medium leading-5',
                          'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                          selected
                            ? 'bg-white shadow text-teal-600'
                            : 'text-gray-700 hover:bg-white/[0.12] hover:text-teal-600'
                        )
                      }
                    >
                      Premium
                    </Tab>
                  </Tab.List>
                </Tab.Group>
              </div>
            </div>
          </div>
          
          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any resources matching your search criteria. Try changing your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('all');
                  setSelectedType('all');
                }}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Free Resources Limit Notice */}
          {currentUser && userProfile && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaBookOpen className="text-blue-600 mt-1" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Free Resources Limit</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      You have used {userProfile.freeResourcesViewed || 0} out of 2 free resources.
                      {userProfile.freeResourcesViewed >= 2 ? (
                        <span> To access more resources, consider upgrading to a premium account.</span>
                      ) : (
                        <span> You have {2 - (userProfile.freeResourcesViewed || 0)} free resources remaining.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;