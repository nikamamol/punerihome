// store/api/tenantApi.js
import { api } from './baseApi';

export const tenantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get tenant profile
    getTenantProfile: builder.query({
      query: () => ({
        url: '/tenant/profile',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['TenantProfile'],
    }),

    // Update tenant profile
    updateTenantProfile: builder.mutation({
      query: (profileData) => ({
        url: '/tenant/profile',
        method: 'PUT',
        body: profileData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: ['TenantProfile'],
    }),

    // Get tenant credit balance
    getTenantCredits: builder.query({
      query: () => ({
        url: '/payments/credit-balance',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['TenantCredits'],
    }),

    // Get payment history
    getPaymentHistory: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/payments/history',
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['PaymentHistory'],
    }),

    // NEW: Get unlocked contacts
    getUnlockedContacts: builder.query({
      query: () => ({
        url: '/tenant/unlocked-contacts', // Adjust this endpoint to match your backend
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['UnlockedContacts'],
    }),

    // Use credit for property
    useCreditForProperty: builder.mutation({
      query: (propertyId) => ({
        url: '/payments/use-credit',
        method: 'POST',
        body: { propertyId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: ['TenantCredits', 'UnlockedContacts'], // Also invalidate unlocked contacts
    }),

    // Create payment order
    createPaymentOrder: builder.mutation({
      query: (orderData) => ({
        url: '/payments/create-order',
        method: 'POST',
        body: orderData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
    }),

    // Verify payment
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/verify-payment',
        method: 'POST',
        body: paymentData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: ['TenantCredits'],
    }),
  }),
});

export const {
  useGetTenantProfileQuery,
  useUpdateTenantProfileMutation,
  useGetTenantCreditsQuery,
  useGetPaymentHistoryQuery,
  useGetUnlockedContactsQuery, // Added this export
  useUseCreditForPropertyMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} = tenantApi;