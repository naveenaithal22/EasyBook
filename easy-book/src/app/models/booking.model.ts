export interface BookingModel {
  id: number;
  userName: string;
  roomId?: number;
  roomNumber?: string;
  startDate: Date;
  endDate: Date;
  status: string;
}
  