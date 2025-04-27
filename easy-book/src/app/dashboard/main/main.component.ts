import { Component } from "@angular/core";

@Component({
  standalone: false,
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  userName: string = "";
  isAdmin() {
    const user = localStorage.getItem("user");
    this.userName = user ? JSON.parse(user)?.name || "" : "";
    let admin = localStorage.getItem("role");
    if (admin === null) {
      return false;
    } else if (admin === "admin") {
      return true;
    }
    // Check if the user is an admin
    // return localStorage.getItem('role') === 'admin';
    return false;
  }
}
