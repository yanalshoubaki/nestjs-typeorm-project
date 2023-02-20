export type Response<T = unknown> = {
  status: number;
  message: string;
  data?: T;
};

export type DecodedToken = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
