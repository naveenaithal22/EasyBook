import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { NotificationLogsComponent } from "./notification-logs/notification-logs.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";

@NgModule({
  declarations: [NotificationLogsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class NotificationsModule {}
