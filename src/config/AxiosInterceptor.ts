import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { SERVERPATH } from "../utils/constants/Global";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { ErrorCode } from "../types/Common";
import { Member } from "../types/Account";
import { TokenRequest } from "../types/Request";
import { fetchToken } from "../repositories/MemeberRepository";
import { logout } from "../store/slices/MemberSlice";

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

const responseConfig = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseError = async (error: AxiosError): Promise<AxiosResponse> => {
  if (error.message === ErrorCode.unauthorized) {
    const state: Member = store.getState().member;

    const tokenRequest: TokenRequest = {
      uuid: state.account.uuid,
      email: state.account.email,
      accessToken: state.token.accessToken,
      refreshToken: state.token.refreshToken,
    };

    const tokenResponse: any = await store.dispatch(fetchToken(tokenRequest) as any);

    if (tokenResponse.error?.message === ErrorCode.unauthorized) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    if (tokenResponse.payload?.accessToken && error.config) {
      error.config.headers.Authorization = `Bearer ${tokenResponse.payload.accessToken}`;
      const response: AxiosResponse = await axios.request(error.config);

      return response;
    }
  }
  // handling non 401 error
  return Promise.reject(error);
};

customAxiosRequest.interceptors.request.use(requestConfig);
customAxiosRequest.interceptors.response.use(responseConfig, responseError);

export default customAxiosRequest;
