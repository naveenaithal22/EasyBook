import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Notification } from './notification.entity';
import { NotificationRepository } from './notification.repository';
import { MailService } from './mail/mail.service';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),

    SequelizeModule.forFeature([Notification]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification-producer',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
          },
          consumer: {
            groupId: 'notification-service-group', // groupId must be unique per service
          },
          producer: {},
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, NotificationRepository, MailService],
  exports: [AppService],
})
export class AppModule {}
