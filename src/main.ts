import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use better-auth route handler
  app.getHttpAdapter().getInstance().all('/api/auth/*', toNodeHandler(auth));
  
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
