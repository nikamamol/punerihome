import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesAPI = createApi({
    reducerPath: 'propertiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Property'],
    endpoints: (builder) => ({
        getFeaturedProperties: builder.query({
            query: () => '/properties/featured',
            providesTags: ['Property']
        }),
        getProperties: builder.query({
            query: (filters) => {
                const params = new URLSearchParams();
                if (filters) {
                    Object.keys(filters).forEach(key => {
                        if (filters[key]) params.append(key, filters[key]);
                    });
                }
                return `/properties?${params.toString()}`;
            },
            providesTags: ['Property']
        }),
        getPropertyById: builder.query({
            query: (id) => `/properties/${id}`,
            providesTags: (result, error, id) => [{ type: 'Property', id }]
        }),
        createProperty: builder.mutation({
            query: (propertyData) => ({
                url: '/properties',
                method: 'POST',
                body: propertyData
            }),
            invalidatesTags: ['Property']
        }),
        updateProperty: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/properties/${id}`,
                method: 'PUT',
                body: updates
            }),
            invalidatesTags: ['Property']
        })
    })
});

export const {
    useGetFeaturedPropertiesQuery,
    useGetPropertiesQuery,
    useGetPropertyByIdQuery,
    useCreatePropertyMutation,
    useUpdatePropertyMutation
} = propertiesAPI;