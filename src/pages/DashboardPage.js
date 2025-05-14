// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { 
  FaCalendarCheck, 
  FaBookOpen, 
  FaChartLine, 
  FaUserCircle, 
  FaBell, 
  FaFileAlt,
  FaChalkboardTeacher,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getBookingsForStudent } from '../services/bookingService';
import { fetchData } from '../services/api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardPage = () => {
  const { currentUser, userProfile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch bookings
        const bookingsData = await getBookingsForStudent(currentUser.uid);
        setBookings(bookingsData ? Object.values(bookingsData) : []);
        
        // Fetch resources
        const resourcesData = await fetchData('resources');
        setResources(resourcesData ? Object.values(resourcesData) : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser.uid]);
  
  // Filter bookings by status
  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.date) >= new Date()
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.date) < new Date()
  );
  
  const cancelledBookings = bookings.filter(booking => 
    booking.status === 'cancelled'
  );
  
  // Dashboard tabs
  const tabs = [
    { key: 'overview', name: 'Overview', icon: <FaChartLine /> },
    { key: 'sessions', name: 'My Sessions', icon: <FaCalendarCheck /> },
    { key: 'resources', name: 'Learning Resources', icon: <FaBookOpen /> },
    { key: 'profile', name: 'Profile', icon: <FaUserCircle /> },
  ];
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 sticky top-24"
          >
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userProfile?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userProfile?.name || 'User'}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Free Resources Used</h3>
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                  {userProfile?.freeResourcesViewed || 0}/2
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-600 h-2 rounded-full" 
                  style={{ width: `${((userProfile?.freeResourcesViewed || 0) / 2) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors duration-300
                    hover:bg-teal-50 hover:text-teal-700`}
                >
                  <span className="inline-block mr-3 text-teal-600">
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-8">Welcome back, {userProfile?.name || 'User'}!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <FaCalendarCheck className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase">Upcoming Sessions</h3>
                    <p className="text-2xl font-bold text-gray-800">{upcomingBookings.length}</p>
                  </div>
                </div>
                <Link 
                  to="#sessions" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all sessions
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <FaBookOpen className="text-teal-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase">Resources</h3>
                    <p className="text-2xl font-bold text-gray-800">{resources.length}</p>
                  </div>
                </div>
                <Link 
                  to="#resources" 
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center"
                >
                  Explore resources
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <FaChartLine className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase">Total Sessions</h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {pastBookings.length + upcomingBookings.length}
                    </p>
                  </div>
                </div>
                <Link 
                  to="#performance" 
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                >
                  View performance
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Upcoming Session */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                <FaCalendarCheck className="inline-block mr-2 text-teal-600" />
                Next Upcoming Session
              </h2>
              
              {upcomingBookings.length > 0 ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {upcomingBookings[0].subject}: {upcomingBookings[0].topic}
                        </h3>
                        <p className="text-gray-600 mb-2">with {upcomingBookings[0].tutorName}</p>
                        <div className="flex items-center text-gray-500 mb-2">
                          <FaCalendarCheck className="mr-2 text-teal-600" />
                          <span>{new Date(upcomingBookings[0].date).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <FaClock className="mr-2 text-teal-600" />
                          <span>{upcomingBookings[0].startTime}</span>
                          <span className="mx-2">•</span>
                          <span>{upcomingBookings[0].duration} hour(s)</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2">You don't have any upcoming sessions</p>
                  </div>
                  <Link 
                    to="/tutors"
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                  >
                    Book a Session
                  </Link>
                </div>
              )}
            </div>
            
            {/* Sessions Tab Panel */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4" id="sessions">
                <FaCalendarCheck className="inline-block mr-2 text-teal-600" />
                My Sessions
              </h2>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <Tab.Group>
                  <Tab.List className="flex border-b border-gray-200">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'px-6 py-3 text-sm font-medium focus:outline-none',
                          selected
                            ? 'border-b-2 border-teal-500 text-teal-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )
                      }
                    >
                      Upcoming ({upcomingBookings.length})
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'px-6 py-3 text-sm font-medium focus:outline-none',
                          selected
                            ? 'border-b-2 border-teal-500 text-teal-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )
                      }
                    >
                      Past ({pastBookings.length})
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'px-6 py-3 text-sm font-medium focus:outline-none',
                          selected
                            ? 'border-b-2 border-teal-500 text-teal-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )
                      }
                    >
                      Cancelled ({cancelledBookings.length})
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className="p-4">
                      {upcomingBookings.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="py-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {booking.subject}: {booking.topic}
                                  </h3>
                                  <p className="text-gray-600">with {booking.tutorName}</p>
                                  <div className="flex items-center text-gray-500 mt-1">
                                    <FaCalendarCheck className="mr-2 text-teal-600" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <FaClock className="mr-2 text-teal-600" />
                                    <span>{booking.startTime}</span>
                                    <span className="mx-2">•</span>
                                    <span>{booking.duration} hour(s)</span>
                                  </div>
                                </div>
                                
                                <div className="flex space-x-3">
                                  <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300">
                                    Reschedule
                                  </button>
                                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500 mb-4">You don't have any upcoming sessions</p>
                          <Link 
                            to="/tutors"
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                          >
                            Book a Session
                          </Link>
                        </div>
                      )}
                    </Tab.Panel>
                    
                    <Tab.Panel className="p-4">
                      {pastBookings.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {pastBookings.map((booking) => (
                            <div key={booking.id} className="py-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {booking.subject}: {booking.topic}
                                  </h3>
                                  <p className="text-gray-600">with {booking.tutorName}</p>
                                  <div className="flex items-center text-gray-500 mt-1">
                                    <FaCalendarCheck className="mr-2 text-teal-600" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <FaClock className="mr-2 text-teal-600" />
                                    <span>{booking.startTime}</span>
                                    <span className="mx-2">•</span>
                                    <span>{booking.duration} hour(s)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <FaCheckCircle className="mr-1" />
                                    Completed
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">You don't have any past sessions</p>
                        </div>
                      )}
                    </Tab.Panel>
                    
                    <Tab.Panel className="p-4">
                      {cancelledBookings.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {cancelledBookings.map((booking) => (
                            <div key={booking.id} className="py-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {booking.subject}: {booking.topic}
                                  </h3>
                                  <p className="text-gray-600">with {booking.tutorName}</p>
                                  <div className="flex items-center text-gray-500 mt-1">
                                    <FaCalendarCheck className="mr-2 text-teal-600" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <FaClock className="mr-2 text-teal-600" />
                                    <span>{booking.startTime}</span>
                                    <span className="mx-2">•</span>
                                    <span>{booking.duration} hour(s)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                    <FaTimesCircle className="mr-1" />
                                    Cancelled
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">You don't have any cancelled sessions</p>
                        </div>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
            
            {/* Resources Panel */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800" id="resources">
                  <FaBookOpen className="inline-block mr-2 text-teal-600" />
                  Learning Resources
                </h2>
                <Link 
                  to="/resources"
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center"
                >
                  View all
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.slice(0, 3).map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <img 
                      src={resource.thumbnailUrl || '/images/resources/default.jpg'} 
                      alt={resource.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.isFree 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {resource.isFree ? 'Free' : 'Premium'}
                        </span>
                        <Link 
                          to={`/resources/${resource.id}`}
                          className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                        >
                          View Resource
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;