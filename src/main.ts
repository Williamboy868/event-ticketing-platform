import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Event Ticketing Platform API')
    .setDescription('The API description for the Event Ticketing Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  
  // Use better-auth route handler
  app.getHttpAdapter().getInstance().all('/api/auth/{*path}', toNodeHandler(auth));
  
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
