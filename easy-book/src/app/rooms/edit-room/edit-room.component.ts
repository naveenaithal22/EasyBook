import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RoomManagerService } from "../../services/room-manager.services";
import { RoomModel } from "../../models/room.model";

@Component({
  standalone: false,
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html",
  styleUrl: "./edit-room.component.scss",
})
export class AddRoomComponent {
  room: RoomModel = { id: 0, number: "", type: "", availability: null };
  title: string = "Add New Room";

  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomModel,
    private roomManagerService: RoomManagerService
  ) {
    if(data){
      this.title = "Update Room"
      this.room = data;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.room.id > 0) {
      this.roomManagerService.put(this.room.id, this.room).subscribe({
        next: (response) => {
          this.dialogRef.close(this.room);
          console.log("POST Success:", response);
        },
        error: (err) => console.error("POST Error:", err),
      });
    }
    else{
      this.roomManagerService.post(this.room).subscribe({
        next: (response) => {
          this.room.id = response;
          this.dialogRef.close(this.room);
          console.log("POST Success:", response);
        },
        error: (err) => console.error("POST Error:", err),
      });

    }
  }
}
