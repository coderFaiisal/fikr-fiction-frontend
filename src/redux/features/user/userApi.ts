import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    getAccessToken: builder.mutation({
      query: () => ({
        url: "/users/refreshToken",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAccessTokenMutation,
} = userApi;
