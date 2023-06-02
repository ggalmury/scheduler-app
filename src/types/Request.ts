import { JobType } from "./Account";
import { TaskColorType, TaskTime } from "./Task";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  birth: Date;
  job: JobType;
}

export interface TaskCreateRequest {
  title: string;
  description: string;
  location: string;
  date: string;
  time: TaskTime;
  privacy: string;
  color: TaskColorType;
}

export interface TaskListRequest {
  startOfWeek: Date;
  endOfWeek: Date;
}

export interface TokenRequest {
  uuid: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
