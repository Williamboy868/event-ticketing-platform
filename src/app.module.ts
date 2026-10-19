import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  ArcjetGuard,
  ArcjetModule,
  detectBot,
  shield,
  slidingWindow,
} from '@arcjet/nest';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EventsModule } from './events/events.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env', 'test/.env'],
    }),
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        key:
          configService.get<string>('ARCJET_KEY') ||
          process.env.ARCJET_KEY ||
          '',
        rules: [
          // Shield WAF: Protects against common attacks like SQL injection and XSS
          shield({
            mode: 'LIVE',
          }),
          // Bot Detection: Protects endpoints against denial of service and ticket hoarding bots
          detectBot({
            mode: 'LIVE',
            allow: [
              'CATEGORY:SEARCH_ENGINE',
              'CATEGORY:PREVIEW',
              'CATEGORY:MONITOR',
            ],
          }),
          // Baseline rate limiting: 100 requests per minute per IP
          slidingWindow({
            mode: 'LIVE',
            interval: '1m',
            max: 100,
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
