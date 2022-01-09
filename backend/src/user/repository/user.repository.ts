import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/base/repository/base.repository.abstract';
import { User, UserDocument } from '../schema/user.schema';
import { UserRepositoryInterface } from './user.interface.repository';

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {
    super(model);
  }
}
