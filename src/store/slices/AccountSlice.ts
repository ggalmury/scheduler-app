import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { Account, Token, User } from "../../types/Account";
import { fetchLogin, fetchRegister } from "../../Repositories/AccountRepository";

interface InitialState {
  account: Account;
  token: Token;
  isLoading: boolean;
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
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
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
      });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
