import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: MailgunService) {}

  @Process('send')
  async processEmail(job: Job) {
    const mailOptions: EmailOptions = job.data;
    console.log('Hello hererre que');
    console.log({ mailOptions });
    // return this.emailService.sendEmail(mailOptions);
    // return this.emailService.createEmail(mailOptions);
  }
}
