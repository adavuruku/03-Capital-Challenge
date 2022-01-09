import { Contact } from '../schema/contact.schema';
import { BaseServiceInterface } from '../../base/service/base.service.interface';

export interface ContactServiceInterface extends BaseServiceInterface<Contact> {
  findAll(searchCondition: any, page?: number): Promise<any>;
  softDelete(searchCondition: any, page?: number): Promise<any>;
}
