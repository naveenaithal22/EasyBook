import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MailService } from './mail/mail.service';
import { FilterLogsDto } from './notification.dto';
import { NotificationRepository } from './notification.repository';
import { NotificationInterface } from './NotificationInterface';

@Injectable()
export class AppService {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private mailService: MailService,

    @Inject('NOTIFICATION_PRODUCER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async handleMessage(payload: NotificationInterface) {
    if (payload.id) {
      const notification = await this.notificationRepo.findById(payload.id);
      if (notification) {
        return this.notificationRepo.updateById(payload.id, {
          status: 'Re Sent',
        } as NotificationInterface);
      }
    }
    if (payload.message === 'User created successfully') {
      this.mailService.sendMail(
        payload.email,
        '🎉 Welcome to EasyBook!',
        `Hi there,
    
    We're excited to have you onboard! Your account has been successfully registered.
    
    Feel free to explore our platform and let us know if you need any help.
    
    Happy booking!
    The EasyBook Team`,
      );
    } else if (payload.message === 'User Deleted successfully') {
      this.mailService.sendMail(
        payload.email,
        '👋 Account Deletion Confirmation',
        `Hello,
    
    We’re sorry to see you go. Your account has been successfully deleted.
    
    If you change your mind, you're always welcome to join us again.
    
    Wishing you all the best,
    The EasyBook Team`,
      );
    }
    return this.notificationRepo.create({
      type: payload.type,
      user: payload.user,
      email: payload.email,
      message: payload.message,
      status: payload.status,
    });
  }
  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async findAll(filter: FilterLogsDto) {
    return this.notificationRepo.findAll(filter);
  }

  async resend(id: number): Promise<void> {
    const notif = await this.notificationRepo.findById(id);
    const messagePayload = notif.dataValues;
    if (!notif) throw new Error('Notification not found');
    this.kafkaClient.emit('notifications', {
      id: messagePayload.id,
      type: messagePayload.type,
      user: messagePayload.user,
      email: messagePayload.email,
      message: messagePayload.message,
      status: messagePayload.status,
    });
  }
}
