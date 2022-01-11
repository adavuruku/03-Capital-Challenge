import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AppLocalStrategy } from './strategy/app-local-strategy';
import { AppJwtStrategy } from './strategy/app-jwt-strategy';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('app.encryption_key'),
        signOptions: {
          expiresIn: `${configService.get('app.jwt_expiration')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, AppLocalStrategy, AppJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
