// import * as dotenv from 'dotenv';
// dotenv.config({ path: '../env/.env' });
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ContactModule } from "./contact/contact.module";
console.log('env app :', process.env.SERVER_SECRET);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env'],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('NODE_ENV') === 'development'
            ? configService.get<string>('LOCAL_DB_URL')
            : configService.get<string>('ONLINE_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ContactModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //https://wanago.io/2021/08/23/api-nestjs-relationships-mongodb/
