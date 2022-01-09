import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/base/repository/base.repository.abstract';
import { Contact, ContactDocument } from '../schema/contact.schema';
import { ContactInterfaceRepository } from './contact.interface.repository';

@Injectable()
export class ContactRepository
  extends BaseRepositoryAbstract<Contact>
  implements ContactInterfaceRepository
{
  constructor(
    @InjectModel(Contact.name) private readonly model: Model<ContactDocument>,
  ) {
    super(model);
  }
}
