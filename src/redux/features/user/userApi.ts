import { api } from "../../api/apiSlice";
import { userLoggedIn } from "./userSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "user",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
            })
          );
          dispatch(userLoggedIn(result.data.data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "user",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
            })
          );
          dispatch(userLoggedIn(result.data.data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
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
