import { Contact } from '../schema/contact.schema';
import { EmailOption } from '../../interphases/email-option';
import { SearchRespose } from '../../interphases/search-response';
import { CreateContactDto } from "../dtos/create-contact.dto";

export interface ContactServiceInterface {
  create(contactDto: CreateContactDto): Promise<Contact>;
}
