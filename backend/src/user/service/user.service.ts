import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepositoryInterface } from '../repository/user.interface.repository';
import { User } from '../schema/user.schema';
import { SearchRespose, UserServiceInterface } from './user.interface.service';
import {generateOTCode, addHourToDate, encryptPassowrd} from '../../_shared/helpers/helpers'
import * as _ from 'lodash';
// import AuthEmail from 'src/_shared/helpers/AuthEmail';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(userDto);
  }

  public async retrieveExistingResource(userDto: CreateUserDto):Promise<SearchRespose> {
    //check email exist and all the validations involves
    const userExist = await this.userRepository.findByCondition({email:userDto.email})
    if(userExist && userExist !== null){
      //check if account is already validate
      if(!userExist.accountVerified){
        return {message: 'The email you provided has been used in our platform, please login to your email to validate your account.', validate:false}
      }
      return {message: 'This email you provided has been used in our platform.', validate:false}
    }
    return {message: 'Account Created Successfuly!. Please follow the link sent to your email to verify the account!', validate:true} 
  }

  public async beforeCreate(userDto: CreateUserDto): Promise<CreateUserDto> {
    //check email exist and all the validations involves
		const code = generateOTCode(10);
		const expHour =	addHourToDate(1);
		const newPassword =	encryptPassowrd(userDto.password);
		const obj = await _.extend(userDto, {password:newPassword, verificationCode: code, accountVerifiedExpire: expHour});
    //send email
		return obj;
  }


  /*async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<User> {
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }*/
}