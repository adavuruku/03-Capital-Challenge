import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../user/repository/user.interface.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByCondition({
      email: email,
      accountVerified: true,
      deleted: false,
    });

    if (!user) {
      throw new UnauthorizedException(`User with Email: ${email}. Not Found`);
    }
    // console.log(`${email}:${password}:${user._id}`);
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      console.log(`Invalid Credentials for user: ${email}`);
      throw new UnauthorizedException(
        `Invalid Credentials for user with ${email}`,
      );
    }
    return {
      userId: user._id,
      fullName: user.fullName,
      emailAddress: user.email,
    };
  }

  /**
   * @param {Object} user required user login payload
   * @return {String} jwt token
   */
  public generateToken(user: any): string {
    return this.jwtService.sign(user);
  }
  /**
   * @param {Object} user required user login payload
   * @return {String} jwt token
   */
  public getCookieWithJwtToken(user: any) {
    const token = this.jwtService.sign(user);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'app.jwt_expiration',
    )}`;
  }
}
