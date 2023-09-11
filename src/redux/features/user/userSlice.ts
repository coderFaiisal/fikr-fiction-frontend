import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export interface IAuthState {
  accessToken: string | undefined;
  user:
    | {
        _id?: string;
        name: string;
        email: string;
        role: string;
      }
    | undefined;
}

const initialState: IAuthState = {
  accessToken: undefined,
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload;
      state.user = jwt_decode(action.payload);
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } =userSlice.actions;
export default userSlice.reducer;
