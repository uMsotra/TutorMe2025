// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logoTeal from '../assets/images/logos/logo-teal.png';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || '/dashboard';
  
  // Login validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      toast.success('Login successful!');
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setFieldError('email', 'Invalid email or password');
        setFieldError('password', 'Invalid email or password');
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many login attempts. Please try again later.');
      } else {
        toast.error('Failed to login. Please try again.');
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
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your TutorMe account
          </p>
        </div>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
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
                    autoComplete="current-password"
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
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
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;