export interface RoomModel {
    id: number;
    number: string;
    type: string;
    availability: RoomAvailabilityModel | null;
  }
  
  export interface RoomAvailabilityModel {
    roomId: number;
    type: string;
    status: string;
  }
  