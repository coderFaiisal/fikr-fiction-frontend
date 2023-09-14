import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { userLoggedOut } from "../features/user/userSlice";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["users", "book", "books", "wishLists", "wishList", "readingLists"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 || result?.error?.status === 404) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  endpoints: () => ({}),
});

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://fikr-fiction-backend.vercel.app/api/v1",
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState)?.user?.accessToken;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});
