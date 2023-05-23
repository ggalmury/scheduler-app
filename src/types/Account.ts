export interface Account {
  email: string;
  name: string;
  job: JobType;
  birth: Date;
  createdDt: Date;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Member {
  account: Account;
  token: Token;
}

export const Job = {
  STUDENT: "학생",
  WORKER: "직장인",
  JOBAPP: "취준생",
  FREELANCER: "프리랜서",
  NONE: "없음",
  PRIVATE: "밝히고 싶지 않음",
} as const;

export type JobType = (typeof Job)[keyof typeof Job];
