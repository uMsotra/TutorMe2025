// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logoTeal from '../assets/images/logos/logo-teal.png';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  // Registration validation schema
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(2, 'Name is too short'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setLoading(true);
      
      // Create user profile data
      const profileData = {
        name: values.name,
        role: 'student'
      };
      
      // Register user
      await signup(values.email, values.password, profileData);
      
      toast.success('Registration successful! Welcome to TutorMe.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        setFieldError('email', 'This email is already in use');
        toast.error('This email is already in use. Please use a different email or login.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logoTeal} alt="TutorMe" className="h-12 mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-gray-600">
            Join TutorMe and start your learning journey
          </p>
        </div>
        
        <Formik
          initialValues={{ 
            name: '', 
            email: '', 
            password: '', 
            confirmPassword: '', 
            terms: false 
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="John Doe"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="you@example.com"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="••••••••"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                    placeholder="••••••••"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
              
              <div className="flex items-center">
                <Field 
                  id="terms" 
                  name="terms" 
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-teal-600 hover:text-teal-500">Terms of Service</Link> and <Link to="/privacy" className="text-teal-600 hover:text-teal-500">Privacy Policy</Link>
                </label>
              </div>
              <ErrorMessage
                name="terms"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
              Google
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <FaFacebookF className="h-5 w-5 text-blue-600 mr-2" />
              Facebook
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;