export interface BaseRepositoryInterface<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(searchCondition: any, page?: number): Promise<T[]>;

  remove(id: string): Promise<T>;

  updateOneRecord(id: string, relations: any): Promise<T>;

  softDeleteRecord(searchCondition: any): Promise<T>;
}
