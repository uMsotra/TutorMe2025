// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaBook, FaInfoCircle, FaArrowLeft, FaCreditCard, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getTutorById } from '../services/tutorService';
import { createBooking } from '../services/bookingService';

const BookingPage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile } = useAuth();
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [step, setStep] = useState(1);
  
  // Get date and time from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dateParam = params.get('date');
    const timeSlotParam = params.get('timeSlot');
    
    if (dateParam) {
      setSelectedDate(new Date(dateParam));
    } else {
      setSelectedDate(new Date());
    }
    
    if (timeSlotParam) {
      setSelectedTimeSlot(timeSlotParam);
    }
  }, [location.search]);
  
  // Fetch tutor data
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const tutorData = await getTutorById(tutorId);
        setTutor(tutorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
        setLoading(false);
        toast.error('Failed to load tutor information');
      }
    };
    
    fetchTutorData();
  }, [tutorId]);
  
  // Generate available time slots based on tutor's availability for the selected date
  useEffect(() => {
    if (tutor && tutor.availability && selectedDate) {
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'lowercase' }).format(selectedDate);
      
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
  
  // Validation schema for booking form
  const bookingSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    topic: Yup.string().required('Topic is required'),
    duration: Yup.number().required('Duration is required').min(1, 'Minimum duration is 1 hour'),
    message: Yup.string(),
    paymentMethod: Yup.string().required('Please select a payment method'),
  });
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setBookingLoading(true);
      
      // Format date for booking
      const bookingDate = selectedDate.toISOString().split('T')[0];
      
      const newBookingData = {
        tutorId,
        studentId: currentUser.uid,
        studentName: userProfile?.name || currentUser.email,
        tutorName: tutor.name,
        subject: values.subject,
        topic: values.topic,
        date: bookingDate,
        startTime: selectedTimeSlot,
        duration: values.duration,
        message: values.message || '',
        paymentMethod: values.paymentMethod,
        bookingId: Math.random().toString(36).substring(2, 15),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      
      // Create booking
      await createBooking(newBookingData);
      setBookingData(newBookingData);
      
      // Show success
      setBookingComplete(true);
      resetForm();
      
      toast.success('Booking successful!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setBookingLoading(false);
      setSubmitting(false);
    }
  };
  
  // Handle navigation to next step
  const handleNextStep = () => {
    if (step === 1 && selectedTimeSlot) {
      setStep(2);
    } else {
      toast.error('Please select a time slot to continue');
    }
  };
  
  // Handle navigation to previous step
  const handlePreviousStep = () => {
    setStep(1);
  };
  
  // Calculate booking fee
  const calculateBookingFee = (duration) => {
    const hourlyRate = 350; // Placeholder rate
    return hourlyRate * duration;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="animate-pulse text-teal-600 text-xl">Loading booking page...</div>
      </div>
    );
  }
  
  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutor Not Found</h2>
        <p className="text-gray-600 mb-6">The tutor you're trying to book doesn't exist or may have been removed.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  // Booking success view
  if (bookingComplete && bookingData) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-8">
                Your tutoring session with {bookingData.tutorName} has been successfully booked.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                <h3 className="font-semibold text-gray-800 mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{bookingData.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tutor:</span>
                    <span className="font-medium">{bookingData.tutorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{bookingData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Topic:</span>
                    <span className="font-medium">{bookingData.topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(bookingData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingData.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{bookingData.duration} hour(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{bookingData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-800 font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-teal-600">
                      R{calculateBookingFee(bookingData.duration)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                <p>
                  A confirmation email has been sent to your registered email address. 
                  You can also view and manage your bookings from your dashboard.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate('/tutors')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Browse More Tutors
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book a Session with {tutor.name}</h1>
        <p className="text-gray-600 mb-8">Fill in the details below to book your tutoring session.</p>
        
        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`relative flex flex-col items-center ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${step >= 1 ? 'border-teal-600 bg-teal-50' : 'border-gray-300'}`}>
              1
            </div>
            <div className="text-sm mt-1">Select Time</div>
            <div className="absolute top-0 -ml-px w-24 right-1/2 h-10 border-t-2 border-teal-600 hidden md:block"></div>
          </div>
          <div className="flex-auto border-t-2 border-teal-600 hidden md:block"></div>
          <div className={`relative flex flex-col items-center ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${step >= 2 ? 'border-teal-600 bg-teal-50' : 'border-gray-300'}`}>
              2
            </div>
            <div className="text-sm mt-1">Session Details</div>
            <div className="absolute top-0 -ml-px w-24 left-1/2 h-10 border-t-2 border-teal-600 hidden md:block"></div>
          </div>
          <div className="flex-auto border-t-2 border-gray-300 hidden md:block"></div>
          <div className={`relative flex flex-col items-center ${step >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${step >= 3 ? 'border-teal-600 bg-teal-50' : 'border-gray-300'}`}>
              3
            </div>
            <div className="text-sm mt-1">Confirmation</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Step 1: Select Time */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                    <img 
                      src={tutor.profileImage || '/images/tutors/default-profile.jpg'} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Tutor Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Name:</span>
                        <span className="font-medium">{tutor.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Subjects:</span>
                        <span className="font-medium">{tutor.subjects.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Hourly Rate:</span>
                        <span className="font-medium text-teal-600">R350</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date & Time</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected Date</h3>
                    <div className="flex items-center text-gray-700">
                      <FaCalendarAlt className="mr-2 text-teal-600" />
                      <span>{selectedDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Available Time Slots
                  </h3>
                  
                  {availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimeSlots.map((timeSlot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTimeSlot(timeSlot)}
                          className={`flex items-center justify-center p-3 border-2 rounded-lg ${
                            selectedTimeSlot === timeSlot
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50 text-gray-700'
                          }`}
                        >
                          <FaClock className="mr-2" />
                          {timeSlot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex">
                        <FaInfoCircle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-700">No available time slots</p>
                          <p className="text-yellow-600">
                            There are no available time slots for the selected date. Please go back and select another date.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {availableTimeSlots.length > 0 && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedTimeSlot}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:opacity-50"
                      >
                        Next: Session Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Session Details */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <Formik
                initialValues={{
                  subject: tutor.subjects[0],
                  topic: '',
                  duration: 1,
                  message: '',
                  paymentMethod: '',
                }}
                validationSchema={bookingSchema}
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting, touched, errors }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaBook className="text-gray-400" />
                          </div>
                          <Field
                            as="select"
                            id="subject"
                            name="subject"
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                          >
                            {tutor.subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="subject"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                          Specific Topic
                        </label>
                        <Field
                          type="text"
                          id="topic"
                          name="topic"
                          placeholder="e.g., Calculus, Trigonometry, Mechanics"
                          className={`block w-full px-3 py-2 border ${
                            errors.topic && touched.topic ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                        <ErrorMessage
                          name="topic"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Session Duration (hours)
                      </label>
                      <Field
                        type="number"
                        id="duration"
                        name="duration"
                        min="1"
                        max="4"
                        className={`block w-full px-3 py-2 border ${
                          errors.duration && touched.duration ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                      />
                      <ErrorMessage
                        name="duration"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Information (Optional)
                      </label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Let the tutor know about any specific areas you need help with or any questions you have."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <Field
                            type="radio"
                            id="creditCard"
                            name="paymentMethod"
                            value="Credit Card"
                            className="sr-only"
                          />
                          <label
                            htmlFor="creditCard"
                            className={`flex items-center p-3 border-2 ${
                              values.paymentMethod === 'Credit Card'
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-300'
                            } rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50`}
                          >
                            <FaCreditCard className="text-teal-600 mr-3" />
                            <span>Credit Card</span>
                          </label>
                        </div>
                        <div className="relative">
                          <Field
                            type="radio"
                            id="bankTransfer"
                            name="paymentMethod"
                            value="Bank Transfer"
                            className="sr-only"
                          />
                          <label
                            htmlFor="bankTransfer"
                            className={`flex items-center p-3 border-2 ${
                              values.paymentMethod === 'Bank Transfer'
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-300'
                            } rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50`}
                          >
                            <FaMoneyBillWave className="text-teal-600 mr-3" />
                            <span>Bank Transfer</span>
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="paymentMethod"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tutor:</span>
                          <span className="font-medium">{tutor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subject:</span>
                          <span className="font-medium">{values.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{selectedTimeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{values.duration} hour(s)</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800 font-bold">Total Fee:</span>
                          <span className="text-lg font-bold text-teal-600">
                            R{calculateBookingFee(values.duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaArrowLeft className="inline mr-2" />
                        Back to Time Selection
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || bookingLoading}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:opacity-50"
                      >
                        {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;