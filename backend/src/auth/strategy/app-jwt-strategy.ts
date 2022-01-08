import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/schema/user.schema';
import { Repository } from 'typeorm';
@Injectable()
export class AppJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Enumerator)
    private readonly enumeratorRepo: Repository<Enumerator>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.enumeratorRepo.findOne(payload.officerId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
