export default class StorageToken {

  private tokenKey: string = 'auth-token';
  private userKey: string = 'user-auth-id';
  private expiredKey: string = 'expired-token';

  public setToken(token: string, userId: string, expired: number = 0): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, userId);
    localStorage.setItem(this.expiredKey, String(expired));
  }

  public getToken(): string|null {
    return localStorage.getItem(this.tokenKey);
  }

  public getUserId(): string|null {
    return localStorage.getItem(this.userKey);
  }

  public getExpiredAt(): number|null {
    const expired: string|null = localStorage.getItem(this.expiredKey);
    return expired ? +expired : null;
  }

  public isExpired(): boolean {
    const expiredAt = this.getExpiredAt();
    return expiredAt ? expiredAt < (new Date()).getTime() : true;
  }

  public clear() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.expiredKey);
  }
}