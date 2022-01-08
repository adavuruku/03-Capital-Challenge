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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserServiceInterface } from '../service/user.interface.service';
import { UserService } from '../service/user.service';
import { AppResponse } from '../../_shared/common';
import { UserLoginDto } from '../dtos/user-login-dto';
import { AppLocalGuard } from '../../auth/guards/app-local-guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface
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
        const response = AppResponse.getResponse({
          code: HttpStatus.CONFLICT,
          message: userExist.message,
        });
        return res.status(HttpStatus.CONFLICT).json(response);
      }
      const obj = await this.userService.beforeCreate(body);
      const value = await this.userService.create(obj);
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        message: userExist.message,
        value: value,
      });
      console.log('respos', response);
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }
}
