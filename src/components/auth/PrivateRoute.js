// src/components/auth/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    // Redirect to login page if user is not authenticated
    // Store the path they were trying to access so we can redirect them after login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  return children;
};

export default PrivateRoute;