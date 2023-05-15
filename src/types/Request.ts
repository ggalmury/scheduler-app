import moment from "moment";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  tel: string;
  birth: moment.Moment;
}
