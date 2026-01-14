import { api } from './baseApi';

export const ownerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ========== PROPERTY MANAGEMENT ==========
    
    // Get owner properties
    getOwnerProperties: builder.query({
      query: () => '/owner/properties',
      providesTags: ['OwnerProperties'],
    }),

    // Get single property by ID (owner's view)
    getOwnerPropertyById: builder.query({
      query: (id) => `/owner/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'OwnerProperty', id }],
    }),

    // Get public property by ID (for public view)
    getPublicPropertyById: builder.query({
      query: (id) => `/properties/public/${id}`,
      providesTags: (result, error, id) => [{ type: 'PublicProperty', id }],
    }),

    // Get all public properties (for tenants/browsing)
    getPublicProperties: builder.query({
      query: ({ 
        page = 1, 
        limit = 10, 
        city, 
        minPrice, 
        maxPrice, 
        propertyType,
        bedrooms,
        propertyFor,
        sortBy = 'created_at',
        order = 'desc'
      } = {}) => ({
        url: '/properties/public',
        params: { 
          page, 
          limit, 
          city, 
          min_price: minPrice,
          max_price: maxPrice,
          property_type: propertyType,
          bedrooms,
          property_for: propertyFor,
          sort_by: sortBy,
          order
        },
      }),
      providesTags: ['PublicProperties'],
    }),

    // Create new property
    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: '/owner/properties',
        method: 'POST',
        body: propertyData,
      }),
      invalidatesTags: ['OwnerProperties'],
    }),

    // Update property
    updateProperty: builder.mutation({
      query: ({ id, ...propertyData }) => ({
        url: `/owner/properties/${id}`,
        method: 'PUT',
        body: propertyData,
      }),
      invalidatesTags: (result, error, { id }) => [
        'OwnerProperties',
        { type: 'OwnerProperty', id },
      ],
    }),

    // Delete property
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/owner/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OwnerProperties'],
    }),

    // Upload property images
    uploadPropertyImages: builder.mutation({
      query: ({ propertyId, images }) => {
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
        return {
          url: `/owner/properties/${propertyId}/images`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'OwnerProperty', id: propertyId },
      ],
    }),

    // Delete property image
    deletePropertyImage: builder.mutation({
      query: ({ propertyId, imageId }) => ({
        url: `/owner/properties/${propertyId}/images/${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'OwnerProperty', id: propertyId },
      ],
    }),

    // Update property status (approve/reject)
    updatePropertyStatus: builder.mutation({
      query: ({ id, status, rejectionReason }) => ({
        url: `/owner/properties/${id}/status`,
        method: 'PATCH',
        body: { status, rejection_reason: rejectionReason },
      }),
      invalidatesTags: (result, error, { id }) => [
        'OwnerProperties',
        { type: 'OwnerProperty', id },
      ],
    }),

    // Feature/unfeature property
    togglePropertyFeature: builder.mutation({
      query: ({ id, featured }) => ({
        url: `/owner/properties/${id}/feature`,
        method: 'PATCH',
        body: { featured },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'OwnerProperty', id },
      ],
    }),

    // ========== INQUIRY MANAGEMENT ==========
    
    // Get property inquiries
    getPropertyInquiries: builder.query({
      query: (propertyId) => `/owner/properties/${propertyId}/inquiries`,
      providesTags: (result, error, propertyId) => [
        { type: 'PropertyInquiries', id: propertyId }
      ],
    }),

    // Get all owner inquiries
    getAllInquiries: builder.query({
      query: () => '/owner/inquiries',
      providesTags: ['AllInquiries'],
    }),

    // Get inquiry by ID
    getInquiryById: builder.query({
      query: (id) => `/owner/inquiries/${id}`,
      providesTags: (result, error, id) => [{ type: 'Inquiry', id }],
    }),

    // Update inquiry status (responded, pending, etc.)
    updateInquiryStatus: builder.mutation({
      query: ({ id, status, response }) => ({
        url: `/owner/inquiries/${id}/status`,
        method: 'PATCH',
        body: { status, response },
      }),
      invalidatesTags: (result, error, { id }) => [
        'AllInquiries',
        { type: 'Inquiry', id },
      ],
    }),

    // Delete inquiry
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/owner/inquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllInquiries'],
    }),

    // ========== DASHBOARD & ANALYTICS ==========
    
    // Get owner dashboard stats
    getOwnerStats: builder.query({
      query: () => '/owner/dashboard/stats',
      providesTags: ['OwnerStats'],
    }),

    // Get property analytics
    getPropertyAnalytics: builder.query({
      query: (propertyId) => `/owner/properties/${propertyId}/analytics`,
      providesTags: (result, error, propertyId) => [
        { type: 'PropertyAnalytics', id: propertyId }
      ],
    }),

    // Get monthly earnings
    getMonthlyEarnings: builder.query({
      query: ({ year, month }) => ({
        url: '/owner/earnings/monthly',
        params: { year, month },
      }),
      providesTags: ['MonthlyEarnings'],
    }),

    // ========== PAYMENT MANAGEMENT ==========
    
    // Get owner payments
    getOwnerPayments: builder.query({
      query: () => '/owner/payments',
      providesTags: ['OwnerPayments'],
    }),

    // Get payment by ID
    getPaymentById: builder.query({
      query: (id) => `/owner/payments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Payment', id }],
    }),

    // Create payment (tenant rent pay)
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/owner/payments',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['OwnerPayments'],
    }),

    // Update payment status
    updatePaymentStatus: builder.mutation({
      query: ({ id, status, transactionId }) => ({
        url: `/owner/payments/${id}/status`,
        method: 'PATCH',
        body: { status, transaction_id: transactionId },
      }),
      invalidatesTags: (result, error, { id }) => [
        'OwnerPayments',
        { type: 'Payment', id },
      ],
    }),

    // Request withdrawal
    requestWithdrawal: builder.mutation({
      query: (withdrawalData) => ({
        url: '/owner/payments/withdraw',
        method: 'POST',
        body: withdrawalData,
      }),
      invalidatesTags: ['OwnerPayments'],
    }),

    // Get credit balance
    getCreditBalance: builder.query({
      query: () => '/owner/credits/balance',
      providesTags: ['CreditBalance'],
    }),

    // Add credits
    addCredits: builder.mutation({
      query: (creditData) => ({
        url: '/owner/credits/add',
        method: 'POST',
        body: creditData,
      }),
      invalidatesTags: ['CreditBalance', 'OwnerPayments'],
    }),

    // Get credit transactions
    getCreditTransactions: builder.query({
      query: () => '/owner/credits/transactions',
      providesTags: ['CreditTransactions'],
    }),

    // ========== TENANT MANAGEMENT ==========
    
    // Get owner's tenants
    getOwnerTenants: builder.query({
      query: () => '/owner/tenants',
      providesTags: ['OwnerTenants'],
    }),

    // Get tenant by ID
    getTenantById: builder.query({
      query: (id) => `/owner/tenants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),

    // Update tenant status
    updateTenantStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/owner/tenants/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        'OwnerTenants',
        { type: 'Tenant', id },
      ],
    }),

    // Send rent reminder
    sendRentReminder: builder.mutation({
      query: (tenantId) => ({
        url: `/owner/tenants/${tenantId}/remind`,
        method: 'POST',
      }),
      invalidatesTags: ['OwnerTenants'],
    }),

    // ========== PROFILE & SETTINGS ==========
    
    // Get owner profile
    getOwnerProfile: builder.query({
      query: () => '/owner/profile',
      providesTags: ['OwnerProfile'],
    }),

    // Update owner profile
    updateOwnerProfile: builder.mutation({
      query: (profileData) => ({
        url: '/owner/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['OwnerProfile'],
    }),

    // Update owner settings
    updateOwnerSettings: builder.mutation({
      query: (settingsData) => ({
        url: '/owner/settings',
        method: 'PUT',
        body: settingsData,
      }),
      providesTags: ['OwnerSettings'],
    }),

    // Change owner password
    changeOwnerPassword: builder.mutation({
      query: (passwordData) => ({
        url: '/owner/change-password',
        method: 'POST',
        body: passwordData,
      }),
    }),

    // ========== NOTIFICATIONS ==========
    
    // Get owner notifications
    getOwnerNotifications: builder.query({
      query: () => '/owner/notifications',
      providesTags: ['OwnerNotifications'],
    }),

    // Mark notification as read
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/owner/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['OwnerNotifications'],
    }),

    // Mark all notifications as read
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: '/owner/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['OwnerNotifications'],
    }),

    // Delete notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/owner/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OwnerNotifications'],
    }),
  }),
});

export const {
  // Property Management
  useGetOwnerPropertiesQuery,
  useGetOwnerPropertyByIdQuery,
  useGetPublicPropertyByIdQuery,
  useGetPublicPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useUploadPropertyImagesMutation,
  useDeletePropertyImageMutation,
  useUpdatePropertyStatusMutation,
  useTogglePropertyFeatureMutation,

  // Inquiry Management
  useGetPropertyInquiriesQuery,
  useGetAllInquiriesQuery,
  useGetInquiryByIdQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,

  // Dashboard & Analytics
  useGetOwnerStatsQuery,
  useGetPropertyAnalyticsQuery,
  useGetMonthlyEarningsQuery,

  // Payment Management
  useGetOwnerPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentStatusMutation,
  useRequestWithdrawalMutation,
  useGetCreditBalanceQuery,
  useAddCreditsMutation,
  useGetCreditTransactionsQuery,

  // Tenant Management
  useGetOwnerTenantsQuery,
  useGetTenantByIdQuery,
  useUpdateTenantStatusMutation,
  useSendRentReminderMutation,

  // Profile & Settings
  useGetOwnerProfileQuery,
  useUpdateOwnerProfileMutation,
  useUpdateOwnerSettingsMutation,
  useChangeOwnerPasswordMutation,

  // Notifications
  useGetOwnerNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} = ownerApi;