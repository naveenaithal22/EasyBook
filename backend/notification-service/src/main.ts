import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1️⃣ Create the standard HTTP app
  const app = await NestFactory.create(AppModule);

  // 2️⃣ Attach a Kafka microservice instance to the same app
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-consumer',
        brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
      },
      consumer: {
        groupId: 'notification-service-group-server',
      },
    },
  });

  // 3️⃣ Start the Kafka microservice
  await app.startAllMicroservices();
  app.enableCors(); // <-- this enables CORS with default settings (allow all origins)
  // 4️⃣ (Optional) Start the HTTP server
  await app.listen(3000, () => {
    console.log('HTTP server listening on port 3000');
  });
}

bootstrap();
