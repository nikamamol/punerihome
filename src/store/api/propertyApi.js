import { api } from './baseApi';

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get property by ID (public route)
    getPropertyById: builder.query({
      query: (id) => `/properties/public/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),

    // Get all public properties with filters
    getPublicProperties: builder.query({
      query: ({
        page = 1,
        limit = 10,
        city,
        minPrice,
        maxPrice,
        propertyType,
        bedrooms,
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
          sort_by: sortBy,
          order
        },
      }),
      providesTags: ['PublicProperties'],
      keepUnusedDataFor: 60,
    }),

    // Get featured properties
    getFeaturedProperties: builder.query({
      query: (limit = 6) => ({
        url: '/properties/public/featured',
        params: { limit },
      }),
      providesTags: ['FeaturedProperties'],
    }),

    // Search properties
    searchProperties: builder.query({
      query: ({ query, ...params }) => ({
        url: '/properties/public/search',
        params: { q: query, ...params },
      }),
      providesTags: ['SearchProperties'],
    }),

    // Get properties by city
    getPropertiesByCity: builder.query({
      query: (city) => ({
        url: '/properties/public/city/:city'.replace(':city', city),
      }),
      providesTags: ['CityProperties'],
    }),

    // Get properties by type
    getPropertiesByType: builder.query({
      query: (type) => ({
        url: '/properties/public/type/:type'.replace(':type', type),
      }),
      providesTags: ['TypeProperties'],
    }),

    // Get properties by owner (public)
    getPropertiesByOwnerPublic: builder.query({
      query: (ownerId) => ({
        url: `/properties/public/owner/${ownerId}`,
      }),
      providesTags: ['OwnerProperties'],
    }),

    // =============== LIKE/SAVE ENDPOINTS ===============
    
    // Check property like/save status
    checkPropertyStatus: builder.query({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/status`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: (result, error, propertyId) => [
        { type: 'PropertyStatus', id: propertyId }
      ],
    }),

    // Like property (Tenant only)
    likeProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/like`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: (result, error, propertyId) => [
        { type: 'Property', id: propertyId },
        { type: 'PropertyStatus', id: propertyId },
        { type: 'LikedProperties' }
      ],
      // Transform response to get updated likes count
      transformResponse: (response) => {
        if (response.success) {
          return {
            ...response,
            data: {
              ...response.data,
              liked: response.liked,
              likes: response.likes
            }
          };
        }
        return response;
      }
    }),

    // Unlike property (Tenant only)
    unlikeProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/unlike`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: (result, error, propertyId) => [
        { type: 'Property', id: propertyId },
        { type: 'PropertyStatus', id: propertyId },
        { type: 'LikedProperties' }
      ],
      transformResponse: (response) => {
        if (response.success) {
          return {
            ...response,
            data: {
              ...response.data,
              liked: false,
              likes: response.likes
            }
          };
        }
        return response;
      }
    }),

    // Save property (All authenticated users)
    saveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/save`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: (result, error, propertyId) => [
        { type: 'Property', id: propertyId },
        { type: 'PropertyStatus', id: propertyId },
        { type: 'SavedProperties' }
      ],
      transformResponse: (response) => {
        if (response.success) {
          return {
            ...response,
            data: {
              ...response.data,
              saved: response.saved,
              saves: response.saves
            }
          };
        }
        return response;
      }
    }),

    // Unsave property (All authenticated users)
    unsaveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/unsave`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      invalidatesTags: (result, error, propertyId) => [
        { type: 'Property', id: propertyId },
        { type: 'PropertyStatus', id: propertyId },
        { type: 'SavedProperties' }
      ],
      transformResponse: (response) => {
        if (response.success) {
          return {
            ...response,
            data: {
              ...response.data,
              saved: false,
              saves: response.saves
            }
          };
        }
        return response;
      }
    }),

    // Get liked properties (Tenant only)
    getLikedProperties: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/properties/user/liked',
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['LikedProperties'],
    }),

    // Get saved properties (All authenticated users)
    getSavedProperties: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/properties/user/saved',
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['SavedProperties'],
    }),

    // Get user property counts
    getUserPropertyCounts: builder.query({
      query: () => ({
        url: '/properties/user/counts',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['UserCounts'],
    }),

    // Get owner's properties (for dashboard)
    getOwnerProperties: builder.query({
      query: (params) => ({
        url: '/properties/owner/properties',
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['OwnerPropertiesDashboard'],
    }),

    // Create property inquiry
    createPropertyInquiry: builder.mutation({
      query: ({ propertyId, ...inquiryData }) => ({
        url: `/properties/public/${propertyId}/inquiry`,
        method: 'POST',
        body: inquiryData,
      }),
      invalidatesTags: ['PropertyInquiries'],
    }),

    // Admin endpoints
    getAllPropertiesAdmin: builder.query({
      query: (params) => ({
        url: '/properties/admin/all',
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['AdminProperties'],
    }),

    getAdminStats: builder.query({
      query: () => ({
        url: '/properties/admin/stats',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
      providesTags: ['AdminStats'],
    }),
  }),
});

export const {
  useGetPropertyByIdQuery,
  useGetPublicPropertiesQuery,
  useGetFeaturedPropertiesQuery,
  useSearchPropertiesQuery,
  useGetPropertiesByCityQuery,
  useGetPropertiesByTypeQuery,
  useGetPropertiesByOwnerPublicQuery,
  useCheckPropertyStatusQuery,
  useLikePropertyMutation,
  useUnlikePropertyMutation,
  useSavePropertyMutation,
  useUnsavePropertyMutation,
  useGetLikedPropertiesQuery,
  useGetSavedPropertiesQuery,
  useGetUserPropertyCountsQuery,
  useGetOwnerPropertiesQuery,
  useCreatePropertyInquiryMutation,
  useGetAllPropertiesAdminQuery,
  useGetAdminStatsQuery,
} = propertyApi;