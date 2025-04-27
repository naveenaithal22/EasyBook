import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SignupComponent } from "../../auth/signup/signup.component";

@Component({
  standalone: false,
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrl: "./user-management.component.scss",
})
export class UserManagementComponent {
  loading = true;
  constructor(private dialog: MatDialog, private httpClient: HttpClient) {}
  users: any[] = [];
  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        // You can refresh your user list here
      } else {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    console.log("Login component initialized");
    let userAPi = this.httpClient.get("http://127.0.0.1:8000/users");
    userAPi.subscribe((data: any) => {
      this.users = data;
      this.loading = false;
    });
  }
  displayedColumns: string[] = ["Name", "Email", "PhoneNumber", "actions"];

  deleteUser(id: number) {
    let userName;

    const user = localStorage.getItem("user");
    userName = user ? JSON.parse(user)?.name || "" : "";
    this.httpClient.delete(`http://127.0.0.1:8000/users/${id}`).subscribe(
      (response) => {
        alert(` User ${userName} deleted successfully`);
        this.ngOnInit();
      },
      (error) => {
        // This block will only execute if catchError is used
        alert(`Error deleting user: ${error.message}`);
        this.ngOnInit();
      }
    );

    // Refresh the user list after deletion
  }
}
