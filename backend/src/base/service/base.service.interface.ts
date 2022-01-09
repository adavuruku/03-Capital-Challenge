export interface BaseServiceInterface<T> {
  create(data: T | any, user?: any): Promise<any>;
  retrieveExistingResource(data: T | any, user?: any): Promise<any>;
  beforeCreate(data: T | any, user?: any): Promise<any>;
}
