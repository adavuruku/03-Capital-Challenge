import { Module } from '@nestjs/common';
import { MailgunModule, MailgunService } from '@nextnm/nestjs-mailgun';
import configuration from '../../config/configuration';
import { BullModule } from '@nestjs/bull';
import { MailerService } from './services/mail.service';
import { MailSendgridService } from './services/mail.sendgrid.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    MailgunModule.forAsyncRoot({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          username: configService.get('service.mailgun.username'),
          key: configService.get('service.mailgun.api_key'),
          // public_key: configuration().service.mailgun., // OPTIONAL
          // timeout: 'number', // OPTIONAL
          url: configService.get('service.mailgun.domain'), // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
    }),
    BullModule.registerQueueAsync({ name: 'email' }),
  ],
  providers: [MailerService, MailSendgridService],
  exports: [MailerService, MailSendgridService],
})
export class MailerModule {}
