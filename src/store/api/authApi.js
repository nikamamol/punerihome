import { api } from './baseApi';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Register User
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        // Handle different response formats
        if (response.success || response.status === 'success') {
          return {
            success: true,
            message: response.message || 'Registration successful',
            data: response.data || response,
          };
        }
        return response;
      },
      transformErrorResponse: (response) => {
        return {
          success: false,
          message: response.data?.message || response.data?.error || 'Registration failed',
          errors: response.data?.errors,
          status: response.status,
        };
      },
      invalidatesTags: ['Auth'],
    }),

    // Login User
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        // Handle different response formats
        if (response.success || response.status === 'success') {
          return {
            success: true,
            message: response.message || 'Login successful',
            token: response.token || response.data?.token,
            user: response.user || response.data?.user,
          };
        }
        return response;
      },
      transformErrorResponse: (response) => {
        return {
          success: false,
          message: response.data?.message || response.data?.error || 'Login failed',
          status: response.status,
        };
      },
      invalidatesTags: ['Auth'],
    }),

    // Get Current User
    getCurrentUser: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Logout User
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, password },
      }),
    }),

    // Verify Email
    verifyEmail: builder.mutation({
      query: (verificationToken) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { token: verificationToken },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;