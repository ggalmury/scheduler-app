import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVERPATH } from "../utils/constants/global";
import { LoginRequest, RegisterRequest } from "../types/Request";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/Account";

export const fetchLogin = createAsyncThunk("auth/signin", async (loginRequest: LoginRequest): Promise<User> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/api/signin`, { loginRequest });
  const result = response.data;

  return result;
});

export const fetchRegister = async (registerRequest: RegisterRequest): Promise<boolean> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/signup`, { registerRequest });
  const result = response.data;

  return result;
};
