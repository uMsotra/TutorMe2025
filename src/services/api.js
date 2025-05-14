// src/services/api.js
import { database } from '../firebase';
import { ref, get, query, orderByChild, equalTo, set, push, update, remove } from 'firebase/database';

export const fetchData = async (path) => {
  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No data found at ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error;
  }
};

export const queryData = async (path, childPath, value) => {
  try {
    const dataRef = ref(database, path);
    const dataQuery = query(dataRef, orderByChild(childPath), equalTo(value));
    const snapshot = await get(dataQuery);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No data found for query at ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`Error querying data from ${path}:`, error);
    throw error;
  }
};

export const createData = async (path, data) => {
  try {
    const dataRef = ref(database, path);
    const newEntryRef = push(dataRef);
    await set(newEntryRef, data);
    return { ...data, id: newEntryRef.key };
  } catch (error) {
    console.error(`Error creating data at ${path}:`, error);
    throw error;
  }
};

export const updateData = async (path, data) => {
  try {
    const dataRef = ref(database, path);
    await update(dataRef, data);
    return data;
  } catch (error) {
    console.error(`Error updating data at ${path}:`, error);
    throw error;
  }
};

export const deleteData = async (path) => {
  try {
    const dataRef = ref(database, path);
    await remove(dataRef);
    return true;
  } catch (error) {
    console.error(`Error deleting data at ${path}:`, error);
    throw error;
  }
};