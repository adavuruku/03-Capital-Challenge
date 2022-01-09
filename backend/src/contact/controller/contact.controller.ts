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
import * as mailgun from 'mailgun-js';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { NextFunction } from 'express';
import { AppResponse } from '../../_shared/app-response/app-response';
import { ContactServiceInterface } from '../service/contact.service.interface';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { AppJwtGuard } from '../../auth/guards/app-jwt-guard';

@ApiTags('Contact')
@ApiOkResponse({ description: 'Created' })
@ApiDefaultResponse({
  description: 'Fail to create [validation / authentication / server failure]',
})
@ApiBearerAuth('access-token')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller('contact')
@UseGuards(AppJwtGuard)
export class ContactController {
  constructor(
    @Inject('ContactServiceInterface')
    private readonly contactService: ContactServiceInterface,
  ) {}

  @ApiOperation({ summary: 'Create Contact' })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() body: CreateContactDto,
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
  ) {
    try {
      const { value, meta } = await this.contactService.create(
        body,
        req.user.userId,
      );
      if (!meta.validate) {
        const response = await AppResponse.getResponse({
          code: HttpStatus.CONFLICT,
          success: meta.validate,
          message: meta.message,
        });
        return res.status(HttpStatus.CONFLICT).json(response);
      }
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        success: meta.validate,
        message: meta.message,
        value: value,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperation({ summary: 'Create Contact' })
  @Get('/list/:page')
  @HttpCode(HttpStatus.OK)
  async find(
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
    @Param('page') page?: string,
  ) {
    try {
      const searchCondition = { user: req.user.userId, deleted: false };
      const pageNumber = +page ? +page : 1;

      const { value } = await this.contactService.findAll(
        searchCondition,
        pageNumber,
      );
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        success: true,
        message: 'Your Contact Lit',
        value: value,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }

  @ApiOperation({ summary: 'Delete Contact' })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Res() res,
    @Req() req,
    @Next() next: NextFunction,
    @Param('id') id: string,
  ) {
    try {
      const searchCondition = { user: req.user.userId, _id: id, deleted: false };
      const { value, meta } = await this.contactService.softDelete(
        searchCondition,
      );
      const response = await AppResponse.getResponse({
        code: HttpStatus.OK,
        success: meta.validate,
        message: meta.message,
        value: value,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  }
}
