import { Account } from 'src/@core/domain/entities/account';
import { User } from 'src/@core/domain/entities/user';
import IAccountsRepository from 'src/@core/domain/repositories/IAccountsRepository';
import IUsersRepository from 'src/@core/domain/repositories/IUsersRepository';

type CreateUserDto = {
  name: string;
  email: string;
};

export type CreateUserOutput = { createdUser?: User; createdAccount?: Account };

export default class CreateUser {
  constructor(
    readonly usersRepository: IUsersRepository,
    readonly accountsRepository: IAccountsRepository,
  ) {}

  async execute({ email, name }: CreateUserDto): Promise<CreateUserOutput> {
    const existingUser = await this.usersRepository.findOne({ email });

    if (existingUser) {
      return { createdUser: undefined, createdAccount: undefined };
    }

    const createdUser = await this.usersRepository.create({
      email,
      name,
    });

    const createdAccount = await this.accountsRepository.create({
      name: 'Personal',
      users_ids: [createdUser.id],
    });

    return { createdUser, createdAccount };
  }
}
