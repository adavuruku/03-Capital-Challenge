import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleEmailService } from './services/google-email';
@Module({
  imports: [ConfigModule],
  providers: [GoogleEmailService],
  exports: [GoogleEmailService],
})
export class MailerModule {}
