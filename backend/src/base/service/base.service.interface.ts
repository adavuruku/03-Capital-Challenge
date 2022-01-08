export interface BaseServieInterface<T> {
  create(data: T | any): Promise<T>;
}
