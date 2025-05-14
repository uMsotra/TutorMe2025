// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllTutors } from '../services/tutorService';
import { fetchData } from '../services/api';
import Hero from '../components/layout/Hero';
import FeaturedTutors from '../components/tutors/FeaturedTutors';
import SubjectsList from '../components/common/SubjectsList';
import Testimonials from '../components/common/Testimonials';
import Features from '../components/common/Features';
import CallToAction from '../components/common/CallToAction';
import { 
  FaGraduationCap, 
  FaUserCheck, 
  FaCalendar, 
  FaBookOpen, 
  FaChartLine, 
  FaLightbulb,
  FaChalkboardTeacher,
  FaAward,
  FaRegLightbulb,
  FaTools,
  FaRocket,
  FaStar
} from 'react-icons/fa';
import logoTeal from '../assets/images/logos/logo-teal.png';

const LandingPage = () => {
  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    tutorsCount: 0,
    studentsCount: 0,
    sessionsCount: 0,
    satisfactionRate: 0
  });

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        // Fetch tutors
        const tutorsData = await getAllTutors();
        setTutors(tutorsData || []);
        
        // Fetch subjects
        const subjectsData = await fetchData('subjects');
        setSubjects(subjectsData ? Object.values(subjectsData) : []);
        
        // Fetch testimonials
        const testimonialsData = await fetchData('testimonials');
        setTestimonials(testimonialsData || []);

        // Fetch stats
        setStats({
          tutorsCount: tutorsData?.length || 10,
          studentsCount: 250,
          sessionsCount: 1200,
          satisfactionRate: 98
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching landing page data:', error);
        setLoading(false);
      }
    };
    
    fetchLandingPageData();
  }, []);

  // Features list for the platform
  const features = [
    {
      id: 'feature1',
      title: 'Expert Tutors',
      description: 'Learn from UCT-educated professionals with extensive teaching experience',
      icon: <FaGraduationCap className="text-4xl" />
    },
    {
      id: 'feature2',
      title: 'Personalized Learning',
      description: 'Customized lessons tailored to your specific needs and learning style',
      icon: <FaUserCheck className="text-4xl" />
    },
    {
      id: 'feature3',
      title: 'Flexible Scheduling',
      description: 'Book sessions at times that work for you with our easy calendar system',
      icon: <FaCalendar className="text-4xl" />
    },
    {
      id: 'feature4',
      title: 'Study Resources',
      description: 'Access a wealth of practice papers, notes, and study materials',
      icon: <FaBookOpen className="text-4xl" />
    },
    {
      id: 'feature5',
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed performance analytics',
      icon: <FaChartLine className="text-4xl" />
    },
    {
      id: 'feature6',
      title: 'Interactive Learning',
      description: 'Engage with dynamic, problem-solving focused teaching methods',
      icon: <FaLightbulb className="text-4xl" />
    }
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      id: 'step1',
      title: 'Find Your Tutor',
      description: 'Browse our selection of qualified tutors based on your subject needs and preferences.',
      icon: <FaChalkboardTeacher className="text-3xl" />
    },
    {
      id: 'step2',
      title: 'Book a Session',
      description: 'Select your preferred date and time from the tutor\'s available schedule.',
      icon: <FaCalendar className="text-3xl" />
    },
    {
      id: 'step3',
      title: 'Learn & Improve',
      description: 'Attend your personalized tutoring session and enhance your understanding.',
      icon: <FaRegLightbulb className="text-3xl" />
    },
    {
      id: 'step4',
      title: 'Track Your Progress',
      description: 'Monitor your improvement over time with our detailed analytics.',
      icon: <FaChartLine className="text-3xl" />
    }
  ];

  // Academic benefits
  const academicBenefits = [
    {
      id: 'benefit1',
      title: 'Improved Grades',
      description: 'Our students typically see a significant improvement in their grades within 2-3 months.',
      icon: <FaAward className="text-3xl text-yellow-500" />
    },
    {
      id: 'benefit2',
      title: 'Better Understanding',
      description: 'Develop a deeper understanding of complex concepts through personalized explanations.',
      icon: <FaTools className="text-3xl text-blue-500" />
    },
    {
      id: 'benefit3',
      title: 'Increased Confidence',
      description: 'Build academic confidence through mastery of challenging subjects.',
      icon: <FaRocket className="text-3xl text-purple-500" />
    },
    {
      id: 'benefit4',
      title: 'Exam Readiness',
      description: 'Be fully prepared for exams with targeted practice and expert guidance.',
      icon: <FaStar className="text-3xl text-orange-500" />
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-teal-600 text-xl">Loading TutorMe...</div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <Hero 
        title="Expert Math & Science Tutoring" 
        subtitle="Learn from experienced UCT graduates specialized in Mathematics, Physics, and Chemistry"
        ctaText="Find a Tutor"
        ctaLink="/tutors"
        imageSrc={logoTeal}
      />
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stats.tutorsCount}+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stats.studentsCount}+</div>
              <div className="text-gray-600">Happy Students</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stats.sessionsCount}+</div>
              <div className="text-gray-600">Tutoring Sessions</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stats.satisfactionRate}%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Subjects Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Subjects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer expert tutoring in these key subjects, with specialized tutors for both high school and university levels.
            </p>
          </motion.div>
          
          <SubjectsList subjects={subjects} />
        </div>
      </section>
      
      {/* Tutors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Tutors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from experienced educators with proven track records and top qualifications from UCT.
            </p>
          </motion.div>
          
          <FeaturedTutors tutors={tutors} />
          
          <div className="text-center mt-10">
            <Link to="/tutors" className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300">
              View All Tutors
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with TutorMe is simple. Follow these steps to begin your journey to academic success.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="relative mb-4">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-600">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose TutorMe?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform provides everything you need to excel in your studies with expert guidance and comprehensive resources.
            </p>
          </motion.div>
          
          <Features features={features} />
        </div>
      </section>
      
      {/* Academic Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the real impact our tutoring services can have on your academic performance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicBenefits.map((benefit, index) => (
              <motion.div 
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 border-t-4"
                style={{ borderColor: index === 0 ? '#EAB308' : index === 1 ? '#3B82F6' : index === 2 ? '#8B5CF6' : '#F97316' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have improved their academic performance with TutorMe.
            </p>
          </motion.div>
          
          <Testimonials testimonials={testimonials} />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about our tutoring services.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                question: "How much does tutoring cost?",
                answer: "Our tutoring rates start at R350 per hour for high school subjects and R450 per hour for university subjects. Discounts are available for package bookings and group sessions."
              },
              {
                question: "How are tutors selected?",
                answer: "All our tutors are carefully vetted UCT graduates with proven expertise in their subjects. They undergo a rigorous interview process and must demonstrate both academic excellence and teaching ability."
              },
              {
                question: "Can I cancel or reschedule a session?",
                answer: "Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours in advance may incur a 50% fee."
              },
              {
                question: "Do you offer online tutoring?",
                answer: "Yes, we offer both in-person and online tutoring options. Our online platform includes interactive whiteboards, document sharing, and video conferencing tools to ensure an effective learning experience."
              },
              {
                question: "How many sessions do I need?",
                answer: "The number of sessions varies based on your goals and current level. Some students benefit from weekly ongoing sessions, while others might need intensive short-term support before exams. Our tutors can recommend a suitable frequency after the first session."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-6"
              >
                <dt className="text-lg font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-gray-600">{faq.answer}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <CallToAction 
        title="Ready to Excel in Your Studies?"
        description="Join TutorMe today and start your journey towards academic success with our expert tutors."
        primaryButtonText="Sign Up Now"
        primaryButtonLink="/register"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
      />
    </div>
  );
};

export default LandingPage;