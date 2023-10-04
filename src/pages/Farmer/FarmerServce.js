import axios from 'axios';


// Function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
  } else if (error.request) {
    console.error('API No Response:', error.request);
  } else {
    console.error('API Request Error:', error.message);
  }
  throw error;
};

// CRUD actions for your entity
const FarmerService = {
  // Create a new entity
  createEntity: async (entityData) => {
    try {
      const response = await axios.post('/farmers', entityData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get a list of entities
  getAllEntities: async () => {
    try {
      const response = await axios.get('/farmers');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get a single entity by ID
  getEntityById: async (entityId) => {
    try {
      const response = await axios.get(`/farmers/${entityId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update an existing entity
  updateEntity: async (entityId, updatedEntityData) => {
    try {
      const response = await axios.put(`/farmers/${entityId}`, updatedEntityData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete an entity by ID
  deleteEntity: async (entityId) => {
    try {
      const response = await axios.delete(`/farmers/${entityId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default FarmerService;
