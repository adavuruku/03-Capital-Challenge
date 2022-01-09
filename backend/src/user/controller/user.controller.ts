import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Next,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserServiceInterface } from '../service/user.interface.service';
import { UserService } from '../service/user.service';
import { AppResponse } from '../../_shared/common';
import { UserLoginDto } from '../dtos/user-login-dto';
import { AppLocalGuard } from '../../auth/guards/app-local-guard';
import { MailerService } from '../../mail/mail.service';
import { MailSendgridService } from '../../mail/mail.sendgrid.service';
import configuration from '../../../config/configuration';
import { VerifyAccountDto } from '../dtos/verify-account.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
    private readonly mailerService: MailerService,
    private readonly mailSendgridService: MailSendgridService,
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() body: CreateUserDto,
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
  ) {
    try {
      const userExist = await this.userService.retrieveExistingResource(body);
      if (!userExist.validate) {
        const response = await AppResponse.getResponse({
          code: HttpStatus.CONFLICT,
          success: userExist.validate,
          message: userExist.message,
        });
        return res.status(HttpStatus.CONFLICT).json(response);
      }
      const obj = await this.userService.beforeCreate(body);
      const value = await this.userService.create(obj);
      //send email
      const emailOption = {
        to: value.email,
        subject: '03 Capital (Contact App) - Verify Account',
        from: configuration().service.mailOptions.from,
        verifyLink: configuration().service.mailOptions.verifyLink,
        verificationCode: value.verificationCode,
      };
      await this.userService.sendEmail(emailOption);
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        success: userExist.validate,
        message: userExist.message,
        value: value,
      });
      // console.log('respos', response);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperation({ summary: 'Verify Account' })
  @Post('/verify-account')
  @HttpCode(HttpStatus.OK)
  async verifyAccount(
    @Body() body: VerifyAccountDto,
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
  ) {
    try {
      const userExist = await this.userService.verifyUserAccount(body);
      if (!userExist.validate) {
        const response = await AppResponse.getResponse({
          code: HttpStatus.UNAUTHORIZED,
          success: userExist.validate,
          message: userExist.message,
        });
        return res.status(HttpStatus.UNAUTHORIZED).json(response);
      }
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        success: userExist.validate,
        message: userExist.message,
        value: userExist,
      });

      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }
  @ApiOperation({ summary: 'Create User' })
  @Post('email-test')
  async testMail(@Req() req, @Res() res) {
    const { email } = req.body;
    const options = {
      from: 'test@mailer.com',
      to: ['aabdulraheemsherif@gmail.com'],
      subject: 'TESTING MAILER',
      text: 'HI THERE',
      html: '<H2>NAYAYA IBRAHIM<H2/>',
      attachment: '',
      'h:X-Mailgun-Variables': '{"key":"value"}',
    };
    // check to see if this is causing the trouble??
    console.log({ json: JSON.stringify(options) });

    const DOMAIN = 'postal.nasims.gov.ng';
    const mg = mailgun({
      apiKey: 'd28a72f9c2bbdffbe87f2bc52f924b9f-29561299-8e97913e',
      domain: DOMAIN,
    });
    const data = {
      // from: 'Excited User <me@samples.mailgun.org>',hgsf@nasims.gov.ng
      from: 'aabdulraheemsherif@gmail.com',
      to: 'aabdulraheemsherif@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
      html: '<H2>NAYAYA IBRAHIM ISMY<H2/>',
    };
    // mg.messages().send(data, function (error, body) {
    //   console.log(body, error);
    // });

    const sem = await this.mailSendgridService.send(data);
    // const yess = await this.mailerService.send(options);
    return res.status(HttpStatus.OK).json(sem);
    // return await this.mailerService.send(options);
  }
}
