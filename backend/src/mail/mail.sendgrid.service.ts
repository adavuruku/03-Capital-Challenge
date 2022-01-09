import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import configuration from "../../config/configuration";

@Injectable()
export class MailSendgridService {
  constructor() {
    // Don't forget this one.
    // The apiKey is required to authenticate our
    // request to SendGrid API.
    // SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    SendGrid.setApiKey(
      // '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',
      configuration().service.sendGrid.api_key,
    );
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`, transport);
    return transport;
  }
}
