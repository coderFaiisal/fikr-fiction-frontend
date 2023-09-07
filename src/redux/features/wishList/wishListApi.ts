import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWishList: builder.mutation({
      query: (data) => ({
        url: "/wishLists/create-wishList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishLists"],
    }),

    getAllWishLists: builder.query({
      query: () => "/wishLists",
      providesTags: ["books"],
    }),
  }),
});

export const { useCreateWishListMutation, useGetAllWishListsQuery } = bookApi;
