// src/pages/ContactPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaTiktok } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions or need assistance? We're here to help. Get in touch with our team.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
                
                {submitSuccess && (
                  <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg">
                    Thank you for your message! We'll get back to you shortly.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-teal-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Address</h3>
                      <p className="text-gray-600">Cape Town, South Africa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="text-teal-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <p className="text-gray-600">+27 78 567 8863</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-teal-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">info@tutorme.co.za</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaWhatsapp className="text-teal-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                      <p className="text-gray-600">+27 78 567 8863</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h2>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com/tutorme" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-blue-500 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  
                  <a 
                    href="https://tiktok.com/@tutorme" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-black hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaTiktok className="text-xl" />
                  </a>
                  
                  <a 
                    href="https://wa.me/27785678863" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-green-500 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5492824255326!2d18.457813511486892!3d-33.95705952955456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d996570732d%3A0x15b82081529d7d48!2sUniversity%20of%20Cape%20Town!5e0!3m2!1sen!2sza!4v1683016245651!5m2!1sen!2sza" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="TutorMe Location"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;