import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ["order", "AdminOrder"],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: "/order/new",
                    method: "POST",
                    body
                }
            }
        }),
        myOrders: builder.query({
            query: () => `/orders/me`,

        }),
        orderDetail: builder.query({
            query: (id) => `/order/${id}`,
            providesTags: ["order"]
        }),
        paymentCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: "/payment/checkout_session",
                    method: "POST",
                    body
                }
            }
        }),
        getAdminOrders: builder.query({
            query: () => `/admin/orders`,
            providesTags: ["order", "AdminOrder"]
        }),
        updateOrder: builder.mutation({
            query(body) {
                return {
                    url: `/admin/orders/${body.id}`,
                    method: "PUT",
                    body: { status: body.status }
                }
            },
            invalidatesTags: ["order"]
        }),
        deleteOrder: builder.mutation({
            query(body) {
                return {
                    url: `/admin/orders/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminOrder"]
        }),
        getSales: builder.query({
            query: ({startDate,endDate}) => `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
            // providesTags: ["order", "AdminOrder"]
        }),
    }),
})

export const { useCreateNewOrderMutation, usePaymentCheckoutSessionMutation, useMyOrdersQuery, useOrderDetailQuery,
     useGetAdminOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation,useLazyGetSalesQuery } = orderApi
