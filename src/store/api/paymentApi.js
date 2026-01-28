    // store/api/paymentApi.js
import { api } from './baseApi';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Razorpay order
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
      invalidatesTags: ['CreditBalance', 'PaymentHistory'],
    }),

    // Get credit balance
    getCreditBalance: builder.query({
      query: () => ({
        url: '/payments/credit-balance',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['CreditBalance'],
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
      invalidatesTags: ['CreditBalance'],
    }),

    // Check if user can view contact
    checkContactAccess: builder.query({
      query: (propertyId) => ({
        url: `/payments/check-access/${propertyId}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
    }),
  }),
});

export const {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useGetCreditBalanceQuery,
  useGetPaymentHistoryQuery,
  useUseCreditForPropertyMutation,
  useCheckContactAccessQuery,
} = paymentApi;