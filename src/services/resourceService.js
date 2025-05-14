// src/services/resourceService.js
import { fetchData, queryData, createData, updateData, deleteData } from './api';

export const getAllResources = async () => {
  try {
    const resources = await fetchData('resources');
    return resources ? Object.values(resources) : [];
  } catch (error) {
    console.error('Error getting all resources:', error);
    throw error;
  }
};

export const getResourceById = async (resourceId) => {
  try {
    return await fetchData(`resources/${resourceId}`);
  } catch (error) {
    console.error(`Error getting resource with ID ${resourceId}:`, error);
    throw error;
  }
};

export const getResourcesBySubject = async (subjectId) => {
  try {
    return await queryData('resources', 'subjectId', subjectId);
  } catch (error) {
    console.error(`Error getting resources for subject ${subjectId}:`, error);
    throw error;
  }
};

export const getFreeResources = async () => {
  try {
    const resources = await fetchData('resources');
    if (!resources) return [];
    
    return Object.values(resources).filter(resource => resource.isFree);
  } catch (error) {
    console.error('Error getting free resources:', error);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const resourceId = resourceData.id || `resource${Date.now()}`;
    const resource = { ...resourceData, id: resourceId };
    await updateData(`resources/${resourceId}`, resource);
    return resource;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

export const updateResource = async (resourceId, resourceData) => {
  try {
    await updateData(`resources/${resourceId}`, resourceData);
    return { ...resourceData, id: resourceId };
  } catch (error) {
    console.error(`Error updating resource with ID ${resourceId}:`, error);
    throw error;
  }
};

export const deleteResource = async (resourceId) => {
  try {
    await deleteData(`resources/${resourceId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting resource with ID ${resourceId}:`, error);
    throw error;
  }
};

export const incrementResourceView = async (userId, resourceId) => {
  try {
    // Add the resourceId to the user's viewed resources
    await updateData(`users/${userId}/viewedResources/${resourceId}`, true);
    
    // Increment the user's free resources viewed count if the resource is free
    const resource = await getResourceById(resourceId);
    if (resource && resource.isFree) {
      const userData = await fetchData(`users/${userId}`);
      const freeResourcesViewed = (userData?.freeResourcesViewed || 0) + 1;
      await updateData(`users/${userId}/freeResourcesViewed`, freeResourcesViewed);
    }
    
    return true;
  } catch (error) {
    console.error(`Error incrementing resource view for user ${userId}, resource ${resourceId}:`, error);
    throw error;
  }
};