import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta?: {
    page: number | null;
    limit: number | null;
    total: number | null;
  };
  data: T;
};
