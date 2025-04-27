import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  standalone: false,
  selector: "app-notification-logs",
  templateUrl: "./notification-logs.component.html",
  styleUrl: "./notification-logs.component.scss",
})
export class NotificationLogsComponent {
  notifications: any[] = [];
  loading: boolean = true;
  constructor(private htppClient: HttpClient) {}
  ngOnInit() {
    this.htppClient.get("http://localhost:3000/logs").subscribe((data: any) => {
      this.notifications = data;
      this.loading = false;
    });
  }
  displayedColumns = ["type", "user", "message", "status", "sentAt", "actions"];

  resedNotification(id: number) {
    this.htppClient
      .post(`http://localhost:3000/${id}/resend`, {})
      .subscribe((response: any) => {
        if (response["success"]) {
          alert("Notification resent successfully");
          this.ngOnInit();
        } else {
          alert("Failed to resend notification");
        }
      });
  }
}
