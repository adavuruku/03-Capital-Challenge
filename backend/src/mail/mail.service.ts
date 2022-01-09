import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import configuration from '../../config/configuration';

@Injectable()
export class MailerService {
  constructor(
    @InjectQueue('email') private readonly mailQueue: Queue,
    private readonly mailGunService: MailgunService,
  ) {}

  async send(config: EmailOptions) {
    try {
      console.log(
        config,
        configuration().service.mailgun.domain,
        this.mailGunService,
      );
      console.log(
        'validate Email',
        this.validateEmail('aabdulraheemsherif@gmail.com'),
      );
      const send = this.mailGunService.createEmail('test.vreg.ng', config);
      console.log('send', send);
      // await this.mailQueue.add('send', config);
      return {
        message: 'Email Queued For Delivery Soon. Check Your Mail Box.',
      };
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException(error);
    }
  }

  async validateEmail(email: string): Promise<any> {
    return await this.mailGunService.validateEmail(email);
  }
}
