import { User } from '../entities/user';

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export type UserFiltersDto = {
  id?: string;
  email?: string;
};

export default interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOne(filters: UserFiltersDto): Promise<User | undefined>;
}
