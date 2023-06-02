import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVERPATH } from "../utils/constants/Global";
import { LoginRequest, RegisterRequest, TokenRequest } from "../types/Request";
import axios, { AxiosResponse } from "axios";
import { Member, Token } from "../types/Account";
import customAxiosRequest from "../config/AxiosInterceptor";

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

export const fetchToken = createAsyncThunk("auth/token", async (tokenRequest: TokenRequest): Promise<Token> => {
  console.log(tokenRequest);
  const response: AxiosResponse = await customAxiosRequest.post(`${SERVERPATH}/auth/token`, tokenRequest);
  const result = response.data;

  return result;
});
