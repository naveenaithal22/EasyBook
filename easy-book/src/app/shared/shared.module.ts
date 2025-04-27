import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { AddBookingComponent } from "../bookings/booking-dashboard/edit-booking/edit-booking.component";
import { MatSelectModule } from "@angular/material/select";
import { AddRoomComponent } from "../rooms/edit-room/edit-room.component";

@NgModule({
  declarations: [AddRoomComponent, AddBookingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class SharedModule {}
