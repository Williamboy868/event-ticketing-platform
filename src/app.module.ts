import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { ArcjetModule } from '@arcjet/nest';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArcjetModule.forRoot({
      key: process.env.ARCJET_KEY!,
      rules: [], // Add specific rules (e.g. shield, bot detection) per route or globally later
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
