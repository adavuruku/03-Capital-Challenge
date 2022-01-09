import { Module } from '@nestjs/common';
import { MailgunModule, MailgunService } from '@nextnm/nestjs-mailgun';
import configuration from '../../config/configuration';
import { BullModule } from '@nestjs/bull';
import { MailerService } from './mail.service';
import { MailSendgridService } from "./mail.sendgrid.service";
@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: configuration().service.mailgun.username,
          key: configuration().service.mailgun.api_key,
          // public_key: configuration().service.mailgun., // OPTIONAL
          // timeout: 'number', // OPTIONAL
          url: configuration().service.mailgun.domain, // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
    }),
    BullModule.registerQueueAsync({ name: 'email' }),
  ],
  providers: [MailerService, MailSendgridService],
  exports: [MailerService, MailSendgridService],
})
export class MailerModule {}
