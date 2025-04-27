export interface NotificationInterface {
  type: string;
  user: string;
  email: string;
  message: string;
  status: string;
  id?: number;
  sentAt?: Date;
}
