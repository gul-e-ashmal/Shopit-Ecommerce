import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[lte]": params?.max,
                    'price[gte]': params?.min,
                    category:params.category,
                    "ratings[gte]":params.ratings

                }
            })

        }),
        getProductDetail: builder.query({
            query: (id) => `/products/${id}`

        })
    }),

})

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi