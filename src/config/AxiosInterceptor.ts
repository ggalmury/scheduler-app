import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { SERVERPATH } from "../utils/constants/Global";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

let store: ToolkitStore;

export const injectStore = (_store: ToolkitStore) => {
  store = _store;
};

const customAxiosRequest: AxiosInstance = axios.create({ baseURL: SERVERPATH, timeout: 10000 });

const requestConfig = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const accessToken: string = store.getState().member.token.accessToken;

  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

customAxiosRequest.interceptors.request.use(requestConfig);
customAxiosRequest.interceptors.response.use();

export default customAxiosRequest;
