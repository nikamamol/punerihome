import { api } from './baseApi';

export const viewingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Submit viewing request
        submitViewingRequest: builder.mutation({
            query: (viewingData) => ({
                url: '/viewing/request',
                method: 'POST',
                body: viewingData,
            }),
            invalidatesTags: ['ViewingRequests'],
        }),

        // Get all viewing requests (Admin only)
        getAllViewingRequests: builder.query({
            query: ({ page = 1, limit = 20 } = {}) => ({
                url: '/viewing/admin/requests',
                params: { page, limit },
            }),
            providesTags: ['ViewingRequests'],
        }),

        // Get viewing request by ID (Admin only)
        getViewingRequestById: builder.query({
            query: (id) => `/viewing/admin/request/${id}`,
            providesTags: (result, error, id) => [{ type: 'ViewingRequest', id }],
        }),

        // Update viewing request status (Admin only)
        updateViewingStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/viewing/admin/request/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'ViewingRequest', id },
                'ViewingRequests'
            ],
        }),

        // Get user viewing requests by phone
        getUserViewingRequests: builder.query({
            query: (phone) => `/viewing/user/${phone}`,
            providesTags: ['UserViewingRequests'],
        }),
    }),
});

export const {
    useSubmitViewingRequestMutation,
    useGetAllViewingRequestsQuery,
    useGetViewingRequestByIdQuery,
    useUpdateViewingStatusMutation,
    useGetUserViewingRequestsQuery,
} = viewingApi;