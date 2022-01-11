import { Model } from 'mongoose';
import { BaseRepositoryInterface } from './base.repository.interface';

export abstract class BaseRepositoryAbstract<T>
  implements BaseRepositoryInterface<T>
{
  private entity: Model<T>;

  protected constructor(entity: Model<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
    return await this.entity.create(data);
  }

  public async findOneById(id: number): Promise<T> {
    return await this.entity.findById(id);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.entity.findOne({ ...filterCondition, deleted: false });
  }

  public async updateOneRecord(id: string, relations: any): Promise<T> {
    return await this.entity.findByIdAndUpdate(
      id,
      { ...relations },
      { new: true },
    );
  }
  public async findAll(searchCondition: any, page?: number): Promise<T[]> {
    const limit = 4;
    const skip = (page && page > 0 ? page - 1 : 1) * limit;
    return await this.entity
      .find({ ...searchCondition })
      .limit(limit)
      .skip(skip)
      .sort('-createdAt');
  }

  public async remove(id: string): Promise<T> {
    return await this.entity.findByIdAndDelete(id);
  }

  public async softDeleteRecord(searchCondition: any): Promise<T> {
    return await this.entity.findOneAndUpdate(
      { ...searchCondition },
      {
        $set: {
          deleted: true,
        },
      },
      { new: true },
    );
  }
}
