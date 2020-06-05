import UserModel from "./models/UserModel";

export enum Roles {
  'admin' = 'admin',
  'moderator' = 'moderator',
  'organizer' = 'organizer',
  'user' = 'user'
};

export type UserModelType = {
  id: string;
  name: string;
  isVerified: boolean;
  roles: keyof typeof Roles;
}

export type UserType = {
  user: UserModelType;
  token: string;
  expired: number;
}

export type UserStateType = {
  token: string|null;
  expired: number|null;
  userUuid: string;
  user: UserModelType|null;
}

export enum UserResponseStatuses {
  'success' = 'success',
  'error' = 'error'
}

export type UserResponseSuccessType = UserType & {
  status: UserResponseStatuses.success
}

export type UserResponseFailType = {
  status: UserResponseStatuses.error;
  message: string;
}

export type UserResponseType = UserResponseSuccessType | UserResponseFailType;

export type TokenType = {
  token: string;
  userId: string;
}