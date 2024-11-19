import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    keepUnusedDataFor: 30,
    tagTypes: ["product", "AdminProduct", "review"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[lte]": params?.max,
                    'price[gte]': params?.min,
                    category: params.category,
                    "ratings[gte]": params.ratings

                }
            })

        }),
        getProductDetail: builder.query({
            query: (param) => ({ url: `/products/${param.id}` }),
            providesTags: ["product", "AdminProduct"]
        }),
        submitReview: builder.mutation({
            query(body) {
                return {
                    url: "/review",
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["product"]
        }),
        canReview: builder.query({
            query: (productId) => `/can_review?productId=${productId}`
        }),
        getProductReview: builder.query({
            query: (productId) => `/admin/reviews?id=${productId}`,
            providesTags: ["review"]
        }),
        deleteReview: builder.mutation({
            query(body) {
                return {
                    url: `/admin/reviews?productId=${body.productId}&id=${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["review"]
        }),
        createProduct: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products`,
                    method: "POST",
                    body: body.product
                }
            },
            invalidatesTags: ["AdminProduct"]
        }),
        uploadProductImages: builder.mutation({
            query(body) {
                console.log(body.images)
                return {
                    url: `/admin/products/${body.id}/upload_images`,
                    method: "PUT",
                    body: {images:body.images}
                }
            },
            invalidatesTags: ["AdminProduct"]
        }),
        deleteProductImages: builder.mutation({
            query(body) {
                
                return {
                    url: `/admin/products/${body.id}/delete_images`,
                    method: "DELETE",
                    body:{imgId:body.imgId}
                }
            },
            invalidatesTags: ["AdminProduct"]
        }),
        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ["AdminProduct"]
        }),
        updateProducts: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products/${body.id}`,
                    method: "PUT",
                    body: body.product
                }
            },
            invalidatesTags: ["AdminProduct"]
        }),
        deleteProducts: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminProduct"]
        })
    }),

})

export const { useGetProductsQuery, useGetProductDetailQuery,
    useSubmitReviewMutation, useCanReviewQuery,
    useDeleteReviewMutation, useLazyGetProductReviewQuery, useGetAdminProductsQuery,
    useDeleteProductsMutation, useUpdateProductsMutation
    , useCreateProductMutation, useUploadProductImagesMutation, useDeleteProductImagesMutation } = productApi