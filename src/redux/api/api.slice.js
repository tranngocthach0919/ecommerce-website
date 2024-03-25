import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ngocthach-reactjs-nodejs-backend.vercel.app',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: builder => ({    
        dataLogin: builder.mutation({
            query: data => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
        }),
        getUser: builder.query({
            query: () => '/user',
        }),

        getProducts: builder.query({
            query: (search) => ({
                url: '/products',
                params: search ,
            })
        }),

        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
            })
        }),

        addAccount: builder.mutation({
            query: (body) => ({
                url: '/accounts',
                method: 'POST',
                body,
            })
        }),

        getCustomer: builder.query({
            query: (username) => ({
                url: `/customers/by-username/${username}`,
            }),
        }),
        addCustomer: builder.mutation({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            })
        }),

        addOrder: builder.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
        }),
    })
});

export const {
    //
    useGetProductsQuery,
    useGetProductQuery,
    useDataLoginMutation,
    //
    useGetUserQuery,
    useAddAccountMutation,
    //
    useGetCustomerQuery,
    useAddCustomerMutation,
    //
    useAddOrderMutation,
} = apiSlice;

export default apiSlice;