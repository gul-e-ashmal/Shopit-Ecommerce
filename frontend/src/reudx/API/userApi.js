import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser, setIsLoading } from "../features/userSlice"

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ["User", "AdminUser"],
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({

        getMe: builder.query({
            query: () => `/me`,
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setIsLoading(false))
                } catch (error) {
                    console.log(error);
                    dispatch(setIsLoading(false))
                }
            },
            providesTags: ["User"]
        }),
        updateProfile: builder.mutation({
            query(body) {
                return {
                    url: "/me/update",
                    method: "PUT",
                    body
                }

            },
            invalidatesTags: ["User"]
        }),
        updateAvatar: builder.mutation({
            query(body) {
                const formData = new FormData();
                formData.append("file", body.avatar);
                console.log(formData)
                return {
                    url: "/me/updateAvatar",
                    method: "PUT",
                    body
                }

            },
            invalidatesTags: ["User"]
        }),
        updatePassword: builder.mutation({
            query(body) {
                const formData = new FormData();
                formData.append("email", body.email);
                console.log(formData)
                return {
                    url: "/updatePassword",
                    method: "PUT",
                    body
                }

            },
            invalidatesTags: ["User"]
        }),
        getAdminUser: builder.query({
            query: () => `/admin/users`,
            providesTags: ["AdminUser"]
        }),
        getAdminSingleUser: builder.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: ["AdminUser"]
        }),
        updateUser: builder.mutation({
            query(body) {
                return {
                    url: `/admin/users/${body.id}`,
                    method: "PUT",
                    body: body.newData
                }
            },
            invalidatesTags: ["AdminUser"]
        }),
        deleteUser: builder.mutation({
            query(body) {
                return {
                    url: `/admin/users/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminUser"]
        })
    }),
})

export const { useGetMeQuery, useUpdateProfileMutation, useUpdateAvatarMutation, useUpdatePasswordMutation, useGetAdminUserQuery, useUpdateUserMutation,
    useGetAdminSingleUserQuery,
    useDeleteUserMutation
} = userApi