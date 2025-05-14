// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { auth, database } from '../firebase';
import { ref, set, get } from 'firebase/database';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch user profile data from database
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            setUserProfile(snapshot.val());
          } else {
            console.log('No user profile found');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up
  const signup = async (email, password, profileData) => {
    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile in Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: profileData.name,
      });
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      // Save additional user data to database
      await set(ref(database, `users/${userCredential.user.uid}`), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: profileData.name,
        role: profileData.role || 'student',
        createdAt: new Date().toISOString(),
        freeResourcesViewed: 0,
        referralCode: generateReferralCode(profileData.name),
        ...profileData
      });
      
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in
  const login = async (email, password) => {
    try {
      setError('');
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError('');
      return await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError('');
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (data) => {
    try {
      setError('');
      if (!currentUser) throw new Error('No user logged in');
      
      // Update profile in database
      await set(ref(database, `users/${currentUser.uid}`), {
        ...userProfile,
        ...data,
        updatedAt: new Date().toISOString()
      });
      
      // Reload user profile
      const userRef = ref(database, `users/${currentUser.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        setUserProfile(snapshot.val());
      }
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Generate referral code
  const generateReferralCode = (name) => {
    const nameSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `${nameSlug}-${randomStr}`;
  };

  const value = {
    currentUser,
    userProfile,
    error,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}