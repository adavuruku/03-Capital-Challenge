import { BaseRepositoryInterface } from '../../base/interface/base.repository.interface';
import { User } from '../schema/user.schema';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {}