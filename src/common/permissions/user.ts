export const READ_SELF_USER = 1;
export const READ_OTHER_USER = 2;
export const ADD_USER = 4;
export const UPDATE_USER = 8;
export const BASIC_USER = 0 | READ_SELF_USER | ADD_USER | UPDATE_USER;
export const ALL_USER =
  READ_SELF_USER | READ_OTHER_USER | ADD_USER | UPDATE_USER;

export type T_READ_SELF_USER = 1;
export type T_READ_OTHER_USER = 2;
export type T_ADD_USER = 4;
export type T_UPDATE_USER = 8;

export type TUserMask =
  | T_READ_SELF_USER
  | T_READ_OTHER_USER
  | T_ADD_USER
  | T_UPDATE_USER;
