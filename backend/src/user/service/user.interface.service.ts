import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EmailOption } from '../../interphases/email-option';
import { SearchRespose } from '../../interphases/search-response';
import { VerifyAccountDto } from '../dtos/verify-account.dto';
import { BaseServiceInterface } from '../../base/service/base.service.interface';

export interface UserServiceInterface extends BaseServiceInterface<User> {
  // sendEmail(option: EmailOption);
  verifyUserAccount(verifyDto: VerifyAccountDto);
}
