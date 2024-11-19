import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({

        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: "POST",
                    body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));

                } catch (error) {
                    console.log(error)
                }
            }

        }),
        register: builder.mutation({
            query(body) {
                return {
                    url: "/register",
                    method: "POST",
                    body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        logout: builder.query({
            query: () => "/logout",
        }),
        forgetPassword: builder.mutation({
            query(body) {
                return {
                    url: "/password/forget",
                    method: "POST",
                    body
                }
            },
        }),
        resetPassword: builder.mutation({
            query(body) {
                console.log(body)
                return {
                    url: `/password/reset/${body.token}`,
                    method: "PUT",
                    body: { password: body.password, confirmPassword: body.confirmPassword }
                }
            }
        })
    }),
})

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery, useForgetPasswordMutation, useResetPasswordMutation } = authApi