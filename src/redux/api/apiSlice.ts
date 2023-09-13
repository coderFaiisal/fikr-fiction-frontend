import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["users", "book", "books", "wishLists", "readingLists"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://fikr-fiction-backend.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
});
