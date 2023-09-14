import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReadingList: builder.mutation({
      query: (data) => ({
        url: "/readingLists/create-readingList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["readingLists"],
    }),

    getSingleReadingLists: builder.query({
      query: (id) => `/readingLists/${id}`,
      providesTags: ["readingLists"],
    }),

    getAllReadingLists: builder.query({
      query: () => "/readingLists",
      providesTags: ["readingLists"],
    }),

    updateReadingList: builder.mutation({
      query: ({ id, data }) => ({
        url: `/readingLists/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readingLists"],
    }),

    deleteReadingList: builder.mutation({
      query: (id) => ({
        url: `/readingLists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["readingLists"],
    }),
  }),
});

export const {
  useCreateReadingListMutation,
  useGetAllReadingListsQuery,
  useGetSingleReadingListsQuery,
  useUpdateReadingListMutation,
  useDeleteReadingListMutation,
} = bookApi;
