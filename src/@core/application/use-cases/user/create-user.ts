import { User } from '../../../domain/entities/user';
import IAccountsRepository from '../../../domain/repositories/IAccountsRepository';
import IUserAccountsRepository from '../../../domain/repositories/IUserAccountsRepository';
import IUsersRepository from '../../../domain/repositories/IUsersRepository';

type CreateUserDto = {
  name: string;
  email: string;
};

export default class CreateUser {
  constructor(
    readonly usersRepository: IUsersRepository,
    readonly accountsRepository: IAccountsRepository,
    readonly userAccountsRepository: IUserAccountsRepository,
  ) {}

  async execute({ email, name }: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ email });

    if (existingUser) {
      return undefined;
    }

    const createdUser = await this.usersRepository.create({
      email,
      name,
    });

    return createdUser;
  }
}
