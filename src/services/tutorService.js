// src/services/tutorService.js
import { fetchData, queryData, createData, updateData, deleteData } from './api';

export const getAllTutors = async () => {
  try {
    const tutors = await fetchData('tutors');
    return tutors ? Object.values(tutors) : [];
  } catch (error) {
    console.error('Error getting all tutors:', error);
    throw error;
  }
};

export const getTutorById = async (tutorId) => {
  try {
    return await fetchData(`tutors/${tutorId}`);
  } catch (error) {
    console.error(`Error getting tutor with ID ${tutorId}:`, error);
    throw error;
  }
};

export const getTutorsBySubject = async (subject) => {
  try {
    const tutors = await fetchData('tutors');
    if (!tutors) return [];
    
    // Filter tutors by subject (since subjects is an array, we can't use Firebase query directly)
    return Object.values(tutors).filter(tutor => 
      tutor.subjects && tutor.subjects.includes(subject)
    );
  } catch (error) {
    console.error(`Error getting tutors for subject ${subject}:`, error);
    throw error;
  }
};

export const createTutor = async (tutorData) => {
  try {
    const tutorId = tutorData.id || `tutor${Date.now()}`;
    const tutor = { ...tutorData, id: tutorId };
    await updateData(`tutors/${tutorId}`, tutor);
    return tutor;
  } catch (error) {
    console.error('Error creating tutor:', error);
    throw error;
  }
};

export const updateTutor = async (tutorId, tutorData) => {
  try {
    await updateData(`tutors/${tutorId}`, tutorData);
    return { ...tutorData, id: tutorId };
  } catch (error) {
    console.error(`Error updating tutor with ID ${tutorId}:`, error);
    throw error;
  }
};

export const deleteTutor = async (tutorId) => {
  try {
    await deleteData(`tutors/${tutorId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting tutor with ID ${tutorId}:`, error);
    throw error;
  }
};