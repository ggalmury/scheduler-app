import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { Account, Token, User } from "../../types/Account";
import { fetchLogin } from "../../repositories/AccountRepository";

interface InitialState {
  account: Account;
  token: Token;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  account: {
    uuid: "",
    email: "",
    password: "",
    name: "",
    tel: "",
    birth: moment(),
    meds: [],
    createdDt: moment(),
  },
  token: {
    accessToken: "",
    refreshToken: "",
  },
  isLoading: false,
  isLoggedIn: false,
};

const memberSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    truely: (state) => {
      state.isLoggedIn = true;
    },
    falsely: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.rejected, () => {
        // TODO: implement error alert
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const user: User = action.payload;

        state.account = user.account;
        state.token = user.token;
        state.isLoggedIn = true;
      });
  },
});

export const { reset, truely, falsely } = memberSlice.actions;
export default memberSlice.reducer;
