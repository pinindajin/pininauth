export type Failable = {
  isError: boolean;
  data: any;
};

export const isError = (failable: Failable) => failable.isError;

export const isSuccess = (failable: Failable) => !failable.isError;

export const success = (data: any): Failable => ({
  isError: false,
  data,
});

export const failure = (data: any) => ({
  data,
  isError: true,
});
