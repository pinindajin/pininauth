export const USER_ROLE = 1;
export const ADMIN_ROLE = 2;
export const ALL_ROLES = USER_ROLE | ADMIN_ROLE;

export type TUSER_ROLE = 1;
export type TADMIN_ROLE = 2;

export type TRoleMask = 0 | TUSER_ROLE | TADMIN_ROLE;
