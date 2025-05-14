// src/services/bookingService.js
import { fetchData, queryData, createData, updateData, deleteData } from './api';

export const getBookingsForStudent = async (studentId) => {
  try {
    return await queryData('bookings', 'studentId', studentId);
  } catch (error) {
    console.error(`Error getting bookings for student ${studentId}:`, error);
    throw error;
  }
};

export const getBookingsForTutor = async (tutorId) => {
  try {
    return await queryData('bookings', 'tutorId', tutorId);
  } catch (error) {
    console.error(`Error getting bookings for tutor ${tutorId}:`, error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    // Check if the time slot is available
    const existingBookings = await queryData('bookings', 'tutorId', bookingData.tutorId);
    
    if (existingBookings) {
      const bookings = Object.values(existingBookings);
      const conflictingBooking = bookings.find(booking => 
        booking.date === bookingData.date && 
        booking.startTime === bookingData.startTime
      );
      
      if (conflictingBooking) {
        throw new Error('This time slot is already booked');
      }
    }
    
    return await createData('bookings', {
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    await updateData(`bookings/${bookingId}`, { status });
    return { id: bookingId, status };
  } catch (error) {
    console.error(`Error updating booking status for ${bookingId}:`, error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    await updateData(`bookings/${bookingId}`, { status: 'cancelled' });
    return { id: bookingId, status: 'cancelled' };
  } catch (error) {
    console.error(`Error cancelling booking ${bookingId}:`, error);
    throw error;
  }
};

export const getTutorAvailability = async (tutorId) => {
  try {
    const tutor = await fetchData(`tutors/${tutorId}`);
    return tutor ? tutor.availability : null;
  } catch (error) {
    console.error(`Error getting availability for tutor ${tutorId}:`, error);
    throw error;
  }
};