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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { ContactService } from '../service/contact.service';
import { AppResponse } from '../../_shared/common';
import configuration from '../../../config/configuration';
import { ContactServiceInterface } from '../service/contact.service.interface';
import { CreateContactDto } from '../dtos/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
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
  ) {}
}
