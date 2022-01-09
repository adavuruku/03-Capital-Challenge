import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
