import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add token to every request
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For file uploads, remove Content-Type header (browser will set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Log request for debugging (remove in production)
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
API.interceptors.response.use(
  (response) => {
    // Log successful response for debugging
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      console.error(`❌ API Error ${error.response.status}:`, {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        message: error.response.data?.message || 'Unknown error',
        data: error.response.data
      });
      
      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          // Unauthorized - Token expired or invalid
          console.log('🔑 Token expired or invalid. Redirecting to login...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Redirect to login page if not already there
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden - User doesn't have permission
          console.log('⛔ Access forbidden');
          break;
          
        case 404:
          // Not found
          console.log('🔍 Resource not found');
          break;
          
        case 422:
          // Validation error
          console.log('📝 Validation error:', error.response.data.errors);
          break;
          
        case 429:
          // Too many requests
          console.log('🚫 Too many requests. Please try again later.');
          break;
          
        case 500:
          // Internal server error
          console.log('💥 Server error. Please try again later.');
          break;
          
        default:
          console.log(`⚠️ Unexpected error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('🌐 Network error - No response received:', {
        url: error.config?.url,
        method: error.config?.method
      });
      
      // Show network error message
      if (!window.navigator.onLine) {
        console.log('📡 You are offline. Please check your internet connection.');
      }
    } else {
      // Something happened in setting up the request
      console.error('❌ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with better error handling
export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await API({
      method,
      url,
      data,
      ...config
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers
    };
    
  } catch (error) {
    // Return structured error response
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Network error',
      status: error.response?.status,
      errors: error.response?.data?.errors || null,
      data: error.response?.data || null,
      missingFields: error.response?.data?.missingFields || null
    };
  }
};

// Helper function to create FormData from object
const createFormData = (data, files = {}) => {
  const formData = new FormData();
  
  // Add all form fields
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      if (key === 'amenities' || key === 'additionalFeatures') {
        // Stringify arrays
        formData.append(key, JSON.stringify(data[key]));
      } else if (typeof data[key] === 'boolean') {
        // Convert boolean to string
        formData.append(key, data[key].toString());
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  
  // Add image files
  if (files.images && files.images.length > 0) {
    files.images.forEach((file) => {
      formData.append('images', file);
    });
  }
  
  // Add video file
  if (files.video) {
    formData.append('video', files.video);
  }
  
  // Add audio file
  if (files.audio) {
    formData.append('audio', files.audio);
  }
  
  return formData;
};

// Convenience methods for common HTTP verbs
export const api = {
  // GET request
  get: async (url, config = {}) => {
    return apiCall('GET', url, null, config);
  },
  
  // POST request
  post: async (url, data = {}, config = {}) => {
    return apiCall('POST', url, data, config);
  },
  
  // PUT request
  put: async (url, data = {}, config = {}) => {
    return apiCall('PUT', url, data, config);
  },
  
  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    return apiCall('PATCH', url, data, config);
  },
  
  // DELETE request
  delete: async (url, config = {}) => {
    return apiCall('DELETE', url, null, config);
  },
  
  // Upload file (multipart/form-data) with progress tracking
  upload: async (url, formData, onProgress = null) => {
    const config = {
      onUploadProgress: onProgress
    };
    
    return apiCall('POST', url, formData, config);
  },
  
  // Upload property with multiple files and progress tracking
  uploadProperty: async (formData, files, onProgress = null) => {
    const formDataWithFiles = createFormData(formData, files);
    
    const config = {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
      timeout: 120000 // 2 minutes for large file uploads
    };
    
    return apiCall('POST', '/properties', formDataWithFiles, config);
  },
  
  // Upload single image with progress
  uploadImage: async (propertyId, file, caption = '', isPrimary = false, onProgress = null) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    formData.append('isPrimary', isPrimary.toString());
    
    const config = {
      onUploadProgress: onProgress
    };
    
    return apiCall('POST', `/properties/${propertyId}/images`, formData, config);
  },
  
  // Check if response has specific error
  hasError: (response, errorType) => {
    if (!response.success) {
      if (errorType === 'validation' && response.errors) return true;
      if (errorType === 'missingFields' && response.missingFields) return true;
      if (errorType === 'auth' && response.status === 401) return true;
      if (errorType === 'network' && !response.status) return true;
    }
    return false;
  },
  
  // Get error message from response
  getErrorMessage: (response, defaultMessage = 'Something went wrong') => {
    if (!response.success) {
      if (response.errors) {
        // Validation errors
        const firstError = Object.values(response.errors)[0];
        return Array.isArray(firstError) ? firstError[0] : firstError;
      }
      if (response.missingFields) {
        return `Missing required fields: ${response.missingFields.join(', ')}`;
      }
      return response.error || defaultMessage;
    }
    return null;
  }
};

// Default export for backward compatibility
export default API;