import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    success: null,
    userType: JSON.parse(localStorage.getItem('user'))?.userType || 'tenant',
  },
  reducers: {
    // Set user data
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.userType = user?.userType || 'tenant';
      
      // Store in localStorage
      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    // Clear auth state (logout)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = 'tenant';
      state.loading = false;
      state.error = null;
      state.success = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set success
    setSuccess: (state, action) => {
      state.success = action.payload;
    },

    // Clear success
    clearSuccess: (state) => {
      state.success = null;
    },

    // Set user type
    setUserType: (state, action) => {
      state.userType = action.payload;
    },

    // Reset auth state
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register mutation
      .addMatcher(
        authApi.endpoints.register.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.loading = false;
          
          if (action.payload.success) {
            state.success = action.payload.message || 'Registration successful';
            
            // Store user data if returned
            if (action.payload.token || action.payload.data?.token) {
              const token = action.payload.token || action.payload.data.token;
              const user = action.payload.user || action.payload.data?.user;
              
              if (token) {
                state.token = token;
                localStorage.setItem('token', token);
              }
              if (user) {
                state.user = user;
                state.userType = user.userType || 'tenant';
                localStorage.setItem('user', JSON.stringify(user));
              }
            }
          } else {
            state.error = action.payload.message || 'Registration failed';
          }
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Registration failed';
        }
      )

      // Login mutation
      .addMatcher(
        authApi.endpoints.login.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.loading = false;
          
          if (action.payload.success) {
            state.success = action.payload.message || 'Login successful';
            
            const token = action.payload.token;
            const user = action.payload.user;
            
            if (token) {
              state.token = token;
              localStorage.setItem('token', token);
            }
            if (user) {
              state.user = user;
              state.userType = user.userType || 'tenant';
              localStorage.setItem('user', JSON.stringify(user));
            }
          } else {
            state.error = action.payload.message || 'Login failed';
          }
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Login failed';
        }
      )

      // Logout mutation
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.user = null;
          state.token = null;
          state.userType = 'tenant';
          state.success = 'Logged out successfully';
          
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      );
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  setUserType,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;