import { createSlice } from "@reduxjs/toolkit";
import { Account, Job, Token, Member } from "../../types/Account";
import { fetchLogin } from "../../repositories/AccountRepository";

interface InitialState {
  account: Account;
  token: Token;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  account: {
    email: "",
    name: "",
    job: Job.NONE,
    birth: new Date(),
    createdDt: new Date(),
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
    logout: (state) => {
      Object.assign(state, initialState);
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
        const member: Member = action.payload;

        state.account = member.account;
        state.token = member.token;
        state.isLoggedIn = true;
      });
  },
});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;
