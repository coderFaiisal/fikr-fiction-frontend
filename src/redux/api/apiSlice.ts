import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fikr-fiction-backend.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
});
