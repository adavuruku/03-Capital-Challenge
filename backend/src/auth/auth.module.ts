import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AppLocalStrategy } from './strategy/app-local-strategy';
import { AppJwtStrategy } from './strategy/app-jwt-strategy';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: configuration().app.encryption_key,
      signOptions: {
        expiresIn: '360s',
      },
      privateKey: configuration().app.encryption_key,
    }),
  ],
  providers: [AuthService, AppLocalStrategy, AppJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
