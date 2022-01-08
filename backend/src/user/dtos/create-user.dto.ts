import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  fullName: string;
 
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  verificationCode: string;
  accountVerified: boolean;
  accountVerifiedExpire: Date;
}
