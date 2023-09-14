import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWishList: builder.mutation({
      query: (data) => ({
        url: "/wishLists/create-wishList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishLists", "wishList"],
    }),

    getAllWishLists: builder.query({
      query: () => "/wishLists",
      providesTags: ["wishLists"],
    }),

    getSingleWishLists: builder.query({
      query: (id) => `/wishLists/${id}`,
      providesTags: ["wishList"],
    }),

    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `/wishLists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishLists", "wishList"],
    }),
  }),
});

export const {
  useCreateWishListMutation,
  useGetAllWishListsQuery,
  useGetSingleWishListsQuery,
  useDeleteWishListMutation,
} = bookApi;
