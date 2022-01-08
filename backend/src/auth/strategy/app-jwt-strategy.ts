import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../user/schema/user.schema';
import { UserRepositoryInterface } from '../../user/repository/user.interface.repository';
import configuration from "../../../config/configuration";
@Injectable()
export class AppJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().app.encryption_key,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOneById(payload.userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
