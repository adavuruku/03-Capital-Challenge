import { Inject, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ContactInterfaceRepository } from '../repository/contact.interface.repository';
import { ContactServiceInterface } from './contact.service.interface';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { Contact } from '../schema/contact.schema';

@Injectable()
export class ContactService implements ContactServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly contactRepository: ContactInterfaceRepository,
  ) {}

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async create(contactDto: CreateContactDto): Promise<Contact> {
    return new Contact();
  }

  /*async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<User> {
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }*/
}
