import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepositoryInterface } from '../repository/user.interface.repository';
import * as crypto from 'crypto';
import { UserServiceInterface } from './user.interface.service';
import {
  generateOTCode,
  encryptPassowrd,
  addTimeToDate,
  verifyDateExpiry,
} from '../../_shared/helpers/helpers';
import * as _ from 'lodash';
import { MailerService } from '../../mail/services/mail.service';
import { MailSendgridService } from '../../mail/services/mail.sendgrid.service';
import { VerifyAccountDto } from '../dtos/verify-account.dto';
import { SearchRespose } from '../../interphases/search-response';
import { EmailOption } from '../../interphases/email-option';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly mailerService: MailerService,
    private readonly mailSendgridService: MailSendgridService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async create(userDto: CreateUserDto): Promise<any> {
    try {
      const existUser = await this.retrieveExistingResource(userDto);
      if (!existUser.validate) {
        return { value: {}, meta: existUser };
      }
      const obj = await this.beforeCreate(userDto);
      const value = await this.userRepository.create(obj);
      const emailOption = {
        to: value.email,
        subject: '03 Capital (Contact App) - Verify Account',
        from: this.configService.get('service.mailOptions.from'),
        verifyLink: this.configService.get('service.mailOptions.verifyLink'),
        verificationCode: value.verificationCode,
      };
      await this.sendEmail(emailOption);
      return { value: value, meta: existUser };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async retrieveExistingResource(
    userDto: CreateUserDto,
  ): Promise<SearchRespose> {
    try {
      const userExist = await this.userRepository.findByCondition({
        email: userDto.email,
      });
      if (userExist && userExist !== null) {
        //check if account is already validate
        if (!userExist.accountVerified) {
          return {
            message:
              'The email you provided has been used in our platform, please login to your email to validate your account.',
            validate: false,
          };
        }
        return {
          message: 'This email you provided has been used in our platform.',
          validate: false,
        };
      }
      return {
        message:
          'Account Created Successfuly!. Please follow the link sent to your email to verify the account!',
        validate: true,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async beforeCreate(userDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      //check email exist and all the validations involves
      const code = generateOTCode(10);
      const expHour = addTimeToDate(1, 'hour');
      const newPassword = encryptPassowrd(userDto.password);
      const obj = await _.extend(userDto, {
        password: newPassword,
        verificationCode: code,
        accountVerifiedExpire: expHour,
      });
      return obj;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {EmailOption} option: options of email to send
   * @return {Object} The user created object
   */
  public async sendEmail(option: EmailOption) {
    try {
      const verifyToken = crypto
        .createHash('md5')
        .update(option.verificationCode)
        .digest('hex');
      const link = `${option.verifyLink}/${option.to}/${verifyToken}`;
      const data = {
        from: option.from,
        to: option.to,
        subject: option.subject,
        html: `<H3>Your verification Link is <a href="${link}">Click</a> to verify your account<H3/>`,
      };
      await this.mailSendgridService.send(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {VerifyAccountDto} verifyDto: payload to verify acoount
   * @return {Object} The user created object
   */
  public async verifyUserAccount(verifyDto: VerifyAccountDto) {
    try {
      //retriee user record
      const userExist = await this.userRepository.findByCondition({
        email: verifyDto.email,
        accountVerified: false,
      });
      if (userExist && userExist !== null) {
        if (verifyDateExpiry(userExist.accountVerifiedExpire, 1, 'hour')) {
          return {
            message: 'Account Verification Failed.',
            validate: false,
          };
        }
        if (!userExist.verificationCode) {
          return {
            message: 'Account Verification Failed.',
            validate: false,
          };
        }
        const userHash = crypto
          .createHash('md5')
          .update(userExist.verificationCode)
          .digest('hex');
        if (userHash !== verifyDto.verificationCode) {
          return {
            message: 'Account Verification Failed.',
            validate: false,
          };
        }

        const updateObj = {
          verificationCode: null,
          accountVerified: true,
        };
        _.extend(userExist, updateObj);
        // console.log('here', userExist, userExist._id.toString());
        await this.userRepository.updateOneRecord(userExist._id, userExist);
        return {
          message: 'Account Verified Successfully. Please Login.',
          validate: true,
        };
      }
      return {
        message: 'Account Verification Failed.',
        validate: false,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
