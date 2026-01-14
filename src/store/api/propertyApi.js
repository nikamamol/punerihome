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
      // Keep data for 60 seconds
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

    // Get similar properties
    getSimilarProperties: builder.query({
      query: ({ propertyId, limit = 4 }) => ({
        url: `/properties/public/${propertyId}/similar`,
        params: { limit },
      }),
      providesTags: ['SimilarProperties'],
    }),

    // Get properties by city
    getPropertiesByCity: builder.query({
      query: (city) => ({
        url: '/properties/public/by-city',
        params: { city },
      }),
      providesTags: ['CityProperties'],
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

    // Save property (for tenants)
    saveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `/properties/public/${propertyId}/save`,
        method: 'POST',
      }),
      invalidatesTags: ['SavedProperties'],
    }),

    // Get saved properties
    getSavedProperties: builder.query({
      query: () => '/properties/saved',
      providesTags: ['SavedProperties'],
    }),
  }),
});

export const {
  useGetPropertyByIdQuery,
  useGetPublicPropertiesQuery,
  useGetFeaturedPropertiesQuery,
  useSearchPropertiesQuery,
  useGetSimilarPropertiesQuery,
  useGetPropertiesByCityQuery,
  useCreatePropertyInquiryMutation,
  useSavePropertyMutation,
  useGetSavedPropertiesQuery,
} = propertyApi;