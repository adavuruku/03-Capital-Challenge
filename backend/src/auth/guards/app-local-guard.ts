import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppLocalGuard extends AuthGuard('localGuard') {}
