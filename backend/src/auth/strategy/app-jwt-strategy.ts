import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../user/schema/user.schema';
import { UserRepositoryInterface } from '../../user/repository/user.interface.repository';
import configuration from '../../../config/configuration';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('app.encryption_key'),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     console.log(configService.get('app.encryption_key'));
      //     return request?.cookies?.Authentication;
      //   },
      // ]),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     console.log('token ', request?.headers?.authorization);
      //     return request?.headers?.authorization.split(' ')[1];
      //   },
      // ]),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOneById(payload.userId);
    if (!user) {
      throw new HttpException(
        'Session has expired, please login.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return payload;
  }
}
