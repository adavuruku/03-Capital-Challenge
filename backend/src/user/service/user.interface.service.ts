import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EmailOption } from '../../interphases/email-option';
import { SearchRespose } from '../../interphases/search-response';
import { VerifyAccountDto } from "../dtos/verify-account.dto";

export interface UserServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;
  retrieveExistingResource(userDto: CreateUserDto): Promise<SearchRespose>;
  beforeCreate(userDto: CreateUserDto): Promise<CreateUserDto>;
  sendEmail(option: EmailOption);
  verifyUserAccount(verifyDto: VerifyAccountDto);
}
