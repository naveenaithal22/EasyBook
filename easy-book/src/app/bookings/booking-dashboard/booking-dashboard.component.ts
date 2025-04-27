import { Component } from "@angular/core";
import { BookingManagerService } from "../../services/booking-manager.services";
import { BookingModel } from "../../models/booking.model";
import { MatDialog } from "@angular/material/dialog";
import { AddBookingComponent } from "./edit-booking/edit-booking.component";
import { RoomManagerService } from "../../services/room-manager.services";
import { RoomModel } from "../../models/room.model";

@Component({
  standalone: false,
  selector: "app-booking-dashboard",
  templateUrl: "./booking-dashboard.component.html",
  styleUrl: "./booking-dashboard.component.scss",
})
export class BookingDashboardComponent {
  displayedColumns = [
    "userName",
    "roomNumber",
    "startDate",
    "endDate",
    "status",
    "actions",
  ];
  bookings: BookingModel[] = [];
  rooms: RoomModel[] = [];

  constructor(private bookingManagerService: BookingManagerService,
    private roomManagerService: RoomManagerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRooms();
    setTimeout(() => {
      this.fetch();
    })
  }

  
  getRooms(): void {
    this.roomManagerService.get().subscribe({
      next: (response) => {
        this.rooms = response;
      },
      error: (err) => console.error("GET Error:", err),
    });
  }

  fetch() {
    this.bookingManagerService.get().subscribe({
      next: (response) => {
        this.bookings = response;
        this.bookings.forEach((booking) => {
          let room = this.rooms.find(r => r.id == booking.roomId);          
          booking.roomNumber = room?.number ?? booking.roomId?.toString()
        });
      },
      error: (err) => console.error("GET Error:", err),
    });
  }

  delete(id: number): void {
    this.bookingManagerService.delete(id).subscribe({
      next: (response) => {
        this.fetch();
        console.log("POST Success:", response);
      },
      error: (err) => console.error("POST Error:", err),
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddBookingComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetch();
        console.log("Room added:", result);
      }
    });
  }

  checkin(id: number): void {
    this.bookingManagerService.put(id, "Checkin").subscribe({
      next: (response) => {
        this.fetch();
        console.log("POST Success:", response);
      },
      error: (err) => console.error("POST Error:", err),
    });
  }

  checkout(id: number): void {
    this.bookingManagerService.put(id, "Checkout").subscribe({
      next: (response) => {
        this.fetch();
        console.log("POST Success:", response);
      },
      error: (err) => console.error("POST Error:", err),
    });
  }

  cancel(id: number): void {
    this.bookingManagerService.put(id, "Cancel").subscribe({
      next: (response) => {
        this.fetch();
        console.log("POST Success:", response);
      },
      error: (err) => console.error("POST Error:", err),
    });
  }
}
