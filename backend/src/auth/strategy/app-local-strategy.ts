import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PassportStrategy } from '@nestjs/passport';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Strategy } from 'passport-local';
  import { Enumerator } from 'src/enumerators/entities/enumerator.entity';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class EnumeratorLocalStrategy extends PassportStrategy(
    Strategy,
    'enumerator',
  ) {
    private readonly logger = new Logger(EnumeratorLocalStrategy.name);
  
    constructor(
      @InjectRepository(Enumerator)
      private readonly enumeratorRepository: Repository<Enumerator>,
    ) {
      super({ usernameField: 'email' });
    }
  
    public async validate(email: string, password: string): Promise<any> {
      const enumerator = await this.enumeratorRepository.findOne({
        where: { email },
      });
  
      if (!enumerator) {
        this.logger.debug(`Enumerator with Email: ${email}. Not Found`);
        throw new NotFoundException(`Enumerator with Email: ${email}. Not Found`);
      }
      this.logger.debug(`${email}:${password}:${enumerator.id}`);
      const isEqual = await bcrypt.compare(password, enumerator.password);
      if (!isEqual) {
        this.logger.debug(`Invalid Credentials for user: ${email}`);
        throw new UnauthorizedException(
          `Invalid Credentials for user with ${email}`,
        );
      }
      // firstName lastName otherName email id
      return {
        type: 'enumerator',
        officerId: enumerator.id,
        firstName: enumerator.firstName,
        lastName: enumerator.lastName,
        otherName: enumerator.otherName,
        emailAddress: enumerator.email,
      };
    }
  
    public async hashPassword(password: string): Promise<string> {
      return await bcrypt.hash(password, 10);
    }
  }
  