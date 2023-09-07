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
  }),
});

export const {
  useCreateReadingListMutation,
  useGetAllReadingListsQuery,
  useUpdateReadingListMutation,
} = bookApi;
