export interface BaseRepositoryInterface<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<T>;

  findWithRelations(relations: any): Promise<T[]>;

  updateOneRecord(id: string, relations: any): Promise<T>;
}
