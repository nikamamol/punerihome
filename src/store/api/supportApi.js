import { api } from './baseApi';

export const supportApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Submit support ticket
        submitSupportTicket: builder.mutation({
            query: (ticketData) => ({
                url: '/support/ticket',
                method: 'POST',
                body: ticketData,
            }),
            invalidatesTags: ['SupportTickets'],
        }),

        // Get all support tickets (Admin only)
        getAllSupportTickets: builder.query({
            query: ({ page = 1, limit = 20 } = {}) => ({
                url: '/support/admin/tickets',
                params: { page, limit },
            }),
            providesTags: ['SupportTickets'],
        }),

        // Get ticket by ID (Admin only)
        getSupportTicketById: builder.query({
            query: (id) => `/support/admin/ticket/${id}`,
            providesTags: (result, error, id) => [{ type: 'SupportTicket', id }],
        }),

        // Update ticket status (Admin only)
        updateTicketStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/support/admin/ticket/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'SupportTicket', id },
                'SupportTickets'
            ],
        }),
    }),
});

export const {
    useSubmitSupportTicketMutation,
    useGetAllSupportTicketsQuery,
    useGetSupportTicketByIdQuery,
    useUpdateTicketStatusMutation,
} = supportApi;