import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BaseServieInterface } from 'src/base/service/base.service.interface';

export interface UserServiceInterface extends BaseServieInterface<User> {
  create(userDto: CreateUserDto): Promise<User>;
  retrieveExistingResource(userDto: CreateUserDto): Promise<SearchRespose>;
  beforeCreate(userDto: CreateUserDto): Promise<CreateUserDto>;
}

export interface SearchRespose {
  message: string;
  validate: boolean;
}
