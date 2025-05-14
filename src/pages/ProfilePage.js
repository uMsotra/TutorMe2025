// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaKey, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: currentUser?.email || '',
        phone: userProfile.phone || '',
        profilePicture: null
      });
    }
  }, [userProfile, currentUser]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulated update for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.');
      setLoading(false);
      return;
    }
    
    try {
      // Simulated update for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError('Failed to update password. Please try again.');
      console.error('Password update error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">
          Manage your account information and password.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 bg-teal-600">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
              </div>
              
              <div className="p-6">
                {error && (
                  <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg">
                    {success}
                  </div>
                )}
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          editMode ? 'border-teal-300' : 'border-gray-300 bg-gray-50'
                        } rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={true} // Email can't be changed
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          editMode ? 'border-teal-300' : 'border-gray-300 bg-gray-50'
                        } rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    {editMode ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditMode(false)}
                          className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                        >
                          <FaTimes className="inline mr-2" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:opacity-50"
                        >
                          <FaSave className="inline mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                      >
                        <FaEdit className="inline mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-teal-600">
                <h2 className="text-xl font-bold text-white">Change Password</h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-6">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div>
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-teal-500 to-teal-700 h-24"></div>
              <div className="relative px-6 pb-6">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-gray-400 overflow-hidden">
                    {profileData.profilePicture ? (
                      <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-4xl" />
                    )}
                  </div>
                </div>
                
                <div className="mt-16 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{profileData.name || 'User'}</h3>
                  <p className="text-gray-600">{profileData.email}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Account Status</h4>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Member Since</h4>
                      <p className="text-gray-600">May 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;