import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVERPATH } from "../utils/constants/global";
import { LoginRequest, RegisterRequest } from "../types/Request";
import axios, { AxiosResponse } from "axios";
import { Member } from "../types/Account";

export const fetchLogin = createAsyncThunk("auth/signin", async (loginRequest: LoginRequest): Promise<Member> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/api/signin`, loginRequest);
  const result = response.data;

  return result;
});

export const fetchDuplicateEmailCheck = async (email: string): Promise<boolean> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/emailcheck`, { email });
  const result = response.data;

  return result;
};

export const fetchRegister = async (registerRequest: RegisterRequest): Promise<boolean> => {
  const { email, password, name, birth, job } = registerRequest;
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/auth/signup`, { email, password, name, birth, job });
  const result = response.data;

  return result;
};
