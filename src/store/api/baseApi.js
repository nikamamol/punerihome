import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Auth',
        'User',
        'OwnerProperties',
        'OwnerProperty',
        'PublicProperty',
        'PublicProperties',
        'PropertyInquiries',
        'AllInquiries',
        'Inquiry',
        'OwnerStats',
        'PropertyAnalytics',
        'MonthlyEarnings',
        'OwnerPayments',
        'Payment',
        'CreditBalance',
        'CreditTransactions',
        'OwnerTenants',
        'Tenant',
        'OwnerProfile',
        'OwnerSettings',
        'OwnerNotifications'],
    endpoints: () => ({}),
});

