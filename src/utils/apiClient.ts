import axios from 'axios';
import tokenStorage from './tokenStorage';
import { performLogout } from './logoutUtils';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error adding auth token to request:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Use comprehensive logout utility
        await performLogout();
        console.log('Token expired, comprehensive logout performed');
      } catch (clearError) {
        console.error('Error during automatic logout:', clearError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient; 