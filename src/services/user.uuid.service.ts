// @ts-ignore
import { DeviceUUID } from "device-uuid";

export class UserUuidService {
  private readonly uuid: string;
  private static instance: UserUuidService;

  private constructor() {
    const storageKey: string|null = localStorage.getItem('user-uuid');

    if (storageKey) {
      this.uuid = storageKey;
    } else {
      this.uuid = new DeviceUUID().get();
      localStorage.setItem('user-uuid', this.uuid);
    }
  }

  public static get(): string {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance.uuid;
  }
}