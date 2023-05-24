export const ErrorCode = {
  unauthorized: "Request failed with status code 401",
  notFound: "Request failed with status code 404",
  conflict: "Request failed with status code 409",
  internalServerError: "Request failed with status code 500",
} as const;
