import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { FilterLogsDto } from './notification.dto';
import { NotificationInterface } from './NotificationInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('logs')
  async getLogs(@Query() filter: FilterLogsDto): Promise<FilterLogsDto[]> {
    return this.appService.findAll(filter);
  }

  @Post(':id/resend')
  async resend(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.appService.resend(id);
    return { success: true };
  }

  @EventPattern('notifications')
  async onNotifications(@Payload() payload: any, @Ctx() context: KafkaContext) {
    if (payload !== null && payload !== undefined) {
      const body: NotificationInterface = {
        id: payload.id,
        email: payload.email,
        type: payload.type,
        user: payload.user,
        message: payload.message,
        status: 'Sent',
        sentAt: new Date(),
      };
      await this.appService.handleMessage(body);
    }
  }
}
