// src/services/courseService.js
import { fetchData, queryData, createData, updateData, deleteData } from './api';

export const getAllCourses = async () => {
  try {
    const courses = await fetchData('courses');
    return courses ? Object.values(courses) : [];
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    return await fetchData(`courses/${courseId}`);
  } catch (error) {
    console.error(`Error getting course with ID ${courseId}:`, error);
    throw error;
  }
};

export const getCoursesByTutor = async (tutorId) => {
  try {
    return await queryData('courses', 'tutorId', tutorId);
  } catch (error) {
    console.error(`Error getting courses for tutor ${tutorId}:`, error);
    throw error;
  }
};

export const getCoursesBySubject = async (subjectName) => {
  try {
    const courses = await fetchData('courses');
    if (!courses) return [];
    
    return Object.values(courses).filter(course => 
      course.subjects && course.subjects.includes(subjectName)
    );
  } catch (error) {
    console.error(`Error getting courses for subject ${subjectName}:`, error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const courseId = courseData.id || `course${Date.now()}`;
    const course = { ...courseData, id: courseId };
    await updateData(`courses/${courseId}`, course);
    return course;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    await updateData(`courses/${courseId}`, courseData);
    return { ...courseData, id: courseId };
  } catch (error) {
    console.error(`Error updating course with ID ${courseId}:`, error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await deleteData(`courses/${courseId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting course with ID ${courseId}:`, error);
    throw error;
  }
};