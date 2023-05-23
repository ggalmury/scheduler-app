import { JobType } from "./Account";

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
