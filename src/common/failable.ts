export interface Failable<T> {
  isError: boolean;
  data: T;
}

export const isError = <T>(failable: Failable<T>) => failable.isError;

export const isSuccess = <T>(failable: Failable<T>) => !failable.isError;

export const success = <T>(data: T): Failable<T> => ({
  isError: false,
  data,
});

export const failure = <T>(data: T): Failable<T> => ({
  data,
  isError: true,
});
