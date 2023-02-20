export type Response<T = unknown> = {
  status: number;
  message: string;
  data?: T;
};
