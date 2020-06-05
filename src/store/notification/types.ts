export enum NotificationTypes {
  'danger' = 'danger',
  'success' = 'success',
  'info' = 'info',
  'warning' = 'warning'
}

export type NotificationType = {
  id: string;
  type: keyof typeof NotificationTypes;
  title?: string;
  description: string;
}

export type NotificationStateType = {
  notifications: NotificationType[]
}