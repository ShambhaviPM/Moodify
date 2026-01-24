import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend server URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error; // Or handle the error appropriately
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error; // Or handle the error appropriately
  }
};