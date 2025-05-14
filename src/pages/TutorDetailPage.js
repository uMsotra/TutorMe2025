// src/pages/TutorDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaLanguage, 
  FaCalendarAlt, 
  FaWhatsapp, 
  FaClock,
  FaCheckCircle,
  FaQuoteLeft
} from 'react-icons/fa';
import { getTutorById } from '../services/tutorService';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TutorDetailPage = () => {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const tutorData = await getTutorById(tutorId);
        setTutor(tutorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
        setLoading(false);
      }
    };
    
    fetchTutorData();
  }, [tutorId]);
  
  // Generate available time slots based on tutor's availability for the selected date
  useEffect(() => {
    if (tutor && tutor.availability) {
     const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate).toLowerCase();
      
      if (tutor.availability[dayOfWeek]) {
        // Parse time slots from tutor's availability
        const slots = tutor.availability[dayOfWeek].map(timeRange => {
          const [startTime, endTime] = timeRange.split('-');
          return { startTime, endTime };
        });
        
        // Generate hourly slots within the available ranges
        const hourlySlots = [];
        slots.forEach(({ startTime, endTime }) => {
          const start = parseInt(startTime.split(':')[0]);
          const end = parseInt(endTime.split(':')[0]);
          
          for (let hour = start; hour < end; hour++) {
            hourlySlots.push(`${hour}:00`);
          }
        });
        
        setAvailableTimeSlots(hourlySlots);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  }, [tutor, selectedDate]);
  
  // Calendar tile content to show availability
  const tileContent = ({ date }) => {
    if (!tutor || !tutor.availability) return null;
    
 const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate).toLowerCase();
    const isAvailable = tutor.availability[dayOfWeek] && tutor.availability[dayOfWeek].length > 0;
    
    return isAvailable ? (
      <div className="h-2 w-2 bg-teal-500 rounded-full mx-auto mt-1"></div>
    ) : null;
  };
  
  // Date range for calendar (current date + 30 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading tutor profile...</div>
      </div>
    );
  }
  
  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutor Not Found</h2>
        <p className="text-gray-600 mb-6">The tutor you're looking for doesn't exist or may have been removed.</p>
        <Link 
          to="/tutors" 
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Browse All Tutors
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tutor Profile Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24"
          >
            <div className="relative pb-2/3 h-60 overflow-hidden">
              <img 
                src={tutor.profileImage || '/images/tutors/default-profile.jpg'} 
                alt={tutor.name} 
                className="absolute h-full w-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-2xl font-bold text-gray-800">{tutor.name}</h1>
                <div className="flex items-center text-yellow-500">
                  <FaStar className="mr-1" />
                  <span className="font-medium">{tutor.rating || 5.0}</span>
                  <span className="text-gray-400 text-sm ml-1">({tutor.reviewCount || 0})</span>
                </div>
              </div>
              
              <div className="text-gray-600 mb-4">
                <p className="font-medium">{tutor.subjects.join(' & ')}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <FaGraduationCap className="mr-3 text-teal-600 flex-shrink-0" />
                  <span className="text-sm">{tutor.education[0]}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaChalkboardTeacher className="mr-3 text-teal-600 flex-shrink-0" />
                  <span className="text-sm">{tutor.currentRole}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaLanguage className="mr-3 text-teal-600 flex-shrink-0" />
                  <span className="text-sm">{tutor.languages.join(' & ')}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <Link 
                  to={`/booking/${tutorId}`}
                  className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
                >
                  Book a Session
                </Link>
                
                <a 
                  href={`https://wa.me/${tutor.contactNumber?.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-300"
                >
                  <FaWhatsapp className="mr-2" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tutor Details */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'about'
                      ? 'border-b-2 border-teal-500 text-teal-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'experience'
                      ? 'border-b-2 border-teal-500 text-teal-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Experience & Education
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'schedule'
                      ? 'border-b-2 border-teal-500 text-teal-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Schedule
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* About Tab */}
              {activeTab === 'about' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Why Choose Me as Your Tutor?</h2>
                  
                  <div className="space-y-4">
                    {tutor.sellingPoints.map((point, index) => {
                      const [title, description] = point.split(' - ');
                      
                      return (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600">
                              {index + 1}
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                            <p className="text-gray-600">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Experience & Education Tab */}
              {activeTab === 'experience' && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
                    
                    <div className="border-l-2 border-teal-500 pl-4 space-y-6">
                      {tutor.education.map((degree, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-6 mt-1 w-4 h-4 rounded-full bg-teal-500"></div>
                          <div>
                            <p className="text-gray-800 font-medium">{degree}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Experience</h2>
                    
                    <div className="border-l-2 border-teal-500 pl-4 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-6 mt-1 w-4 h-4 rounded-full bg-teal-500"></div>
                        <div>
                          <p className="text-gray-800 font-medium">{tutor.currentRole}</p>
                          <p className="text-gray-600">Current</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 mt-1 w-4 h-4 rounded-full bg-teal-500"></div>
                        <div>
                          <p className="text-gray-800 font-medium">Tutoring Experience</p>
                          <p className="text-gray-600">{tutor.experience}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Availability</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Select a date to view available time slots and book a session.
                      </p>
                      
                      <div className="custom-calendar">
                        <Calendar
                          onChange={setSelectedDate}
                          value={selectedDate}
                          tileContent={tileContent}
                          minDate={new Date()}
                          maxDate={maxDate}
                          className="rounded-lg border-none shadow-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Available Time Slots for {selectedDate.toLocaleDateString()}
                      </h3>
                      
                      {availableTimeSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {availableTimeSlots.map((timeSlot, index) => (
                            <div key={index} className="relative">
                              <input
                                type="radio"
                                id={`time-${index}`}
                                name="timeSlot"
                                value={timeSlot}
                                className="sr-only"
                              />
                              <label
                                htmlFor={`time-${index}`}
                                className="flex items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50"
                              >
                                <FaCalendarAlt className="mr-2 text-teal-600" />
                                <span>{timeSlot}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-yellow-700">
                            No available time slots for the selected date. Please select another date.
                          </p>
                        </div>
                      )}
                      
                      {availableTimeSlots.length > 0 && (
                        <div className="mt-6">
                          <Link 
                            to={`/booking/${tutorId}?date=${selectedDate.toISOString()}`}
                            className="block text-center w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition duration-300"
                          >
                            Proceed to Booking
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Testimonials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden mt-8"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Student Testimonials</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        T
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Thabo M.</h4>
                      <div className="flex text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{tutor.name} helped me improve my {tutor.subjects[0]} grade from a C to an A in just 3 months. 
                    The real-life examples made difficult concepts much easier to understand."
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        L
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Lesedi K.</h4>
                      <div className="flex text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{tutor.name}'s personalized approach to {tutor.subjects[0]} helped me pass my first-year university exams with distinction. 
                    I highly recommend {tutor.name} to anyone struggling with advanced concepts."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailPage;