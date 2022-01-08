import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
 
  @IsNotEmpty()
  @MinLength(2)
  fullName: string;
 
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
