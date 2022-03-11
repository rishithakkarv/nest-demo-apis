export type FormatedResponse<T> = {
  success: boolean;
  data: T;
  msg: string;
  statusCode: number;
};

export function FormatResponse<T>(
  success: boolean,
  data: T,
  msg: string,
  statusCode: number,
): FormatedResponse<T> {
  return { success, data, msg, statusCode };
}
