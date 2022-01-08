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
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { NextFunction } from 'express';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserServiceInterface } from '../service/user.interface.service';
  import { UserService } from '../service/user.service';
  
  @ApiTags('User')
  @Controller('user')
  export class UserController {
    constructor(@Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface) {}
  
    @ApiOperation({ summary: 'Create User' })
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async createAttribute(
      @Body() body: CreateUserDto,
      @Res() res,
      @Req() req,
      @Next() next: NextFunction,
    ) {
      try {
        const userExist = await this.userService.retrieveExistingResource(body)
        if(!userExist.validate){
          return res.status(HttpStatus.CONFLICT).json(userExist)
        }
        const obj = await this.userService.beforeCreate(body)
        const value = await this.userService.create(obj);
        return res.status(HttpStatus.OK).json(value);
      } catch (err) {
        next(err);
      }
    }
  }
  