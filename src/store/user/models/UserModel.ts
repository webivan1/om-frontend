import { Roles, UserModelType } from "../types";

export default class UserModel {
  private user: UserModelType;
  private static instance?: UserModel;

  private constructor(user: UserModelType) {
    this.user = user;
  }

  public static call(user?: UserModelType): UserModel|undefined {
    if (!UserModel.instance && user) {
      UserModel.instance = new this(user);
    }
    return UserModel.instance;
  }

  canRoles(roles: string[]): boolean {
    return roles.some(role => this.user.roles.indexOf(role) >= 0);
  }

  isAdmin(): boolean {
    return this.user.roles.indexOf(Roles.admin) >= 0;
  }

  isModerator(): boolean {
    return this.user.roles.indexOf(Roles.moderator) >= 0;
  }

  isOrganizer(): boolean {
    return this.user.roles.indexOf(Roles.organizer) >= 0;
  }

  isUser(): boolean {
    return this.user.roles.indexOf(Roles.user) >= 0;
  }

  canControlEvents(): boolean {
    return this.canRoles([Roles.admin, Roles.moderator, Roles.organizer]);
  }
}