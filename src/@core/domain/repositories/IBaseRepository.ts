export default interface IBaseRepository<T = any> {
  findOne(filters: Partial<T>): Promise<T | undefined>;
  findMany(filters: Partial<T>): Promise<T[] | undefined>;
  create(createDto: Omit<T, 'id'>): Promise<T>;
  update(updateDto: Partial<T>): Promise<T>;
  deleteOne(id: string): Promise<T>;
}
