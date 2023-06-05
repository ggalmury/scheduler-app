import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskCreateRequest } from "../types/Request";
import { Task } from "../types/Task";
import { AxiosResponse } from "axios";
import customAxiosRequest from "../config/AxiosInterceptor";
import { SERVERPATH } from "../utils/constants/Global";

export const fetchTaskList = createAsyncThunk("task/list", async (): Promise<Task[]> => {
  const response: AxiosResponse = await customAxiosRequest.post(`${SERVERPATH}/task/list`);
  const result = response.data;

  return result;
});

export const fetchTaskCreate = createAsyncThunk("task/create", async (taskCreateRequest: TaskCreateRequest): Promise<Task> => {
  const response: AxiosResponse = await customAxiosRequest.post(`${SERVERPATH}/task/create`, taskCreateRequest);
  const result = response.data;

  return result;
});
