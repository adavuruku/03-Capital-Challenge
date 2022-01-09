import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { ContactInterfaceRepository } from '../repository/contact.interface.repository';
import { ContactServiceInterface } from './contact.service.interface';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { Contact } from '../schema/contact.schema';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { SearchRespose } from '../../interphases/search-response';
import {
  addHourToDate,
  encryptPassowrd,
  generateOTCode,
} from '../../_shared/helpers/helpers';
import { validate } from 'class-validator';
import {
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';

@Injectable()
export class ContactService implements ContactServiceInterface {
  constructor(
    @Inject('ContactInterfaceRepository')
    private readonly contactRepository: ContactInterfaceRepository,
  ) {}

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async create(
    contactDto: CreateContactDto,
    user: string,
  ): Promise<any> {
    try {
      //1. make sure contact doesnt exist for same user
      const contactExist = await this.retrieveExistingResource(
        contactDto,
        user,
      );
      if (!contactExist.validate) {
        return { value: {}, meta: contactExist };
      }
      const obj = await this.beforeCreate(contactDto);
      Object.assign(obj, { user: user });
      const newContact = await this.contactRepository.create(obj);
      return { value: newContact, meta: contactExist };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async retrieveExistingResource(
    contactDto: CreateContactDto,
    user: string,
  ): Promise<SearchRespose> {
    try {
      const contactExist = await this.contactRepository.findByCondition({
        email: contactDto.email,
        phoneNumber: contactDto.phoneNumber,
        deleted: false,
        user,
      });
      if (contactExist) {
        return {
          message: 'This contact already exist in your contact List.',
          validate: false,
        };
      }
      return {
        message: 'Contact created and added successfully!',
        validate: true,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async beforeCreate(contactDto: CreateContactDto): Promise<any> {
    try {
      return contactDto;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async findAll(searchCondition: any, page?: number): Promise<any> {
    try {
      const allRecord = await this.contactRepository.findAll(
        searchCondition,
        page,
      );
      return { value: allRecord, meta: {} };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * @param {userDto} option: required user payload for create
   * @return {Object} The user created object
   */
  public async softDelete(searchCondition: any): Promise<any> {
    try {
      const delrecord = await this.contactRepository.softDeleteRecord(
        searchCondition,
      );
      return {
        value: delrecord || {},
        meta: {
          message: 'Contact Deleted',
          validate: true,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
