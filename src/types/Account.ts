import moment from "moment";

export interface Account {
  uuid: string;
  email: string;
  password: string;
  name: string;
  tel: string;
  birth: moment.Moment;
  meds: string[];
  createdDt: moment.Moment;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  account: Account;
  token: Token;
}
