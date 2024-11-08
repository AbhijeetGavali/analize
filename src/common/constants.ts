export const saltRounds = 10;
export const defaultPageNumber = 0;
export const defaultPageSize = 10;
export const userJwtTokenValidDays = 7;
export const jwtCookieName = "jwtToken";

export enum userRole {
  SUPERADMIN = 1,
  ADMIN = 2,
  VENDOR = 3,
  EMPLOYEE = 4,
  SALES = 5,
  DESIGNER = 6,
  CUSTOMER = 7,
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
