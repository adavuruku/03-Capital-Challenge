import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        'env/.env'
      ],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NODE_ENV') === 'development'? configService.get<string>('LOCAL_DB_URL'):configService.get<string>('ONLINE_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}