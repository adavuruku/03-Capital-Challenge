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
import { AppResponse } from './_shared/common';
import { UserLoginDto } from './user/dtos/user-login-dto';
import { AppLocalGuard } from './auth/guards/app-local-guard';
import { AuthService } from './auth/service/auth.service';

@ApiTags('User')
@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Login' })
  @UseGuards(AppLocalGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: UserLoginDto,
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
  ) {
    try {
      const user = req.user;
      const token = this.authService.generateToken(user);
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        message: 'Login Successfully',
        value: user,
        token: token,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }
}
