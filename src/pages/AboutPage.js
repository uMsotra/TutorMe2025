// src/pages/AboutPage.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaHistory } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About TutorMe</h1>
        <p className="text-gray-600 mb-8">
          Learn more about our mission to provide quality education through expert tutoring.
        </p>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2019, TutorMe was created by a group of passionate educators from the University of Cape Town
              who believed that personalized tutoring could make a significant difference in students' academic journeys.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small tutoring service for university students has grown into a comprehensive
              platform connecting learners with expert tutors across various subjects, with a focus on
              Mathematics, Physics, and Chemistry.
            </p>
            <p className="text-gray-600">
              Today, we're proud to have helped hundreds of students improve their grades, deepen their
              understanding of challenging subjects, and build confidence in their academic abilities.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At TutorMe, we believe that every student deserves access to quality education and support.
              Our mission is to bridge the gap between traditional classroom learning and the individualized
              attention that many students need to truly excel.
            </p>
            <p className="text-gray-600">
              We're committed to providing accessible, high-quality tutoring services that help students
              build strong foundations in core subjects while developing critical thinking and problem-solving
              skills that will serve them throughout their academic and professional careers.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <FaUsers className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Our Team</h3>
              </div>
              <p className="text-gray-600">
                Our tutors are all graduates or current postgraduate students from the University of Cape Town,
                with strong academic backgrounds and proven teaching experience. We carefully select tutors who
                not only excel in their subjects but also have the ability to explain complex concepts in a clear,
                relatable way.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <FaChalkboardTeacher className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Our Approach</h3>
              </div>
              <p className="text-gray-600">
                We believe in a personalized approach to tutoring. Each student has unique needs, learning styles,
                and goals, and our tutors adapt their teaching methods accordingly. We focus on building understanding
                rather than memorization, using real-world examples and interactive techniques to make learning
                engaging and effective.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-teal-600 text-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-teal-100 mb-6">
              Join TutorMe today and take the first step towards academic success.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-white text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors duration-300">
                Find a Tutor
              </button>
              <button className="px-6 py-2 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;