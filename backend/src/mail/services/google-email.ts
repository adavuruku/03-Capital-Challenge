import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailOptions } from '@nextnm/nestjs-mailgun';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
// import * as google from 'googleapis';
// import * as gmail from 'googleapis/build/src/apis/gmail';
// const OAuth2 = google.Auth.OAuth2Client;
import * as smtpTransport from 'nodemailer-smtp-transport';
import mail from '@sendgrid/mail';
import { GmailOption } from '../gmail-structure';

@Injectable()
export class GoogleEmailService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * convert to uppercase 1st letter
   * @param {Object} content
   * @param {String} templateValue
   * @return {Boolean} The code
   */
  async getHtmlFromEmailTemplate(data, template) {
    try {
      const templateFile = `./templates/${
        this.configService.get('service.emailTemplates')[template]
      }.ejs`;

      return new Promise((resolve, reject) => {
        fs.readFile(templateFile, 'utf8', (err, file) => {
          if (err) {
            throw err;
          }
          const html = ejs.render(file, {
            ...data,
          });
          return resolve(html);
        });
      });
    } catch (e) {
      console.log('email :::: ', e);
      throw e;
    }
  }

  async sendEmail(data: GmailOption) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: 'smtp.gmail.com', //this.configService.get('service.gmailService.gmail_host'),
        port: 465, //this.configService.get('service.gmailService.gmail_port'),
        secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
          user: 'sherifcoding2021@gmail.com', //this.configService.get('service.gmailService.gmail_email'),
          pass: 'oricha2021', //this.configService.get('service.gmailService.gmail_password'),
        },
      }),
    );

    const { templatePayload } = data;
    const htmContent = data.template
      ? await this.getHtmlFromEmailTemplate(templatePayload, data.template)
      : '';

    const mailOptions = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: htmContent,
    };
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return Promise.resolve(error);
      } else {
        console.log(
          'Email sent: ' + mailOptions.to + 'Server Res: ' + info.response,
        );
        return Promise.resolve(true);
      }
    });
  }
}
