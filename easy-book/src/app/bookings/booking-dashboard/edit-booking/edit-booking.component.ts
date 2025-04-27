import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { BookingManagerService } from "../../../services/booking-manager.services";
import { BookingModel } from "../../../models/booking.model";
import { RoomManagerService } from "../../../services/room-manager.services";
import { RoomModel } from "../../../models/room.model";

@Component({
  standalone: false,
  selector: "app-edit-Booking",
  templateUrl: "./edit-booking.component.html",
  styleUrl: "./edit-booking.component.scss",
})
export class AddBookingComponent {
  booking: BookingModel = { id: 0, userName: "", startDate: new Date(), endDate: new Date, status: "" };
  title: string = "Add New Booking";
  rooms: RoomModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookingModel,
    private bookingManagerService: BookingManagerService,
    private roomManagerService: RoomManagerService
  ) {
    this.getRooms();
  }

  getRooms(): void {
    this.roomManagerService.get().subscribe({
      next: (response) => {
        this.rooms = response;
      },
      error: (err) => console.error("GET Error:", err),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.bookingManagerService.post(this.booking).subscribe({
      next: (response) => {
        this.booking.id = response;
        this.dialogRef.close(this.booking);
        console.log("POST Success:", response);
      },
      error: (err) => console.error("POST Error:", err),
    });
  }
}
