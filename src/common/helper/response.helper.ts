import { Response } from '@/@types/general';

/**
 * Function to set response object
 * @param status
 * @param message
 * @param data
 * @returns Response<T>
 */
export const setResponse = <T = unknown>(
  status: number,
  message: string,
  data?: T,
): Response<T> => {
  return {
    status,
    message,
    data,
  };
};
