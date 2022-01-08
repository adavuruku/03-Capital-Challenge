import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './controller/auth.constant';
import { AuthModule } from '../auth/auth.module';
console.log('env USER :', process.env.SERVER_SECRET);
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'UserServiceInterface',
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: ['UserRepositoryInterface'],
})
export class UserModule {}
