import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVERPATH } from "../utils/constants/Global";
import { LoginRequest, RegisterRequest } from "../types/Request";
import axios, { AxiosResponse } from "axios";
import { Member } from "../types/Account";

export const fetchLogin = createAsyncThunk("auth/signin", async (loginRequest: LoginRequest): Promise<Member> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/signin`, loginRequest);
  const result = response.data;

  return result;
});

export const fetchDuplicateEmailCheck = async (email: string): Promise<boolean> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/emailcheck`, { email });
  const result = response.data;

  return result;
};

export const fetchRegister = async (registerRequest: RegisterRequest): Promise<boolean> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/signup`, registerRequest);
  const result = response.data;

  return result;
};
