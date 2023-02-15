import { Account } from '../../../domain/entities/account';
import { User } from '../../../domain/entities/user';
import IAccountsRepository from '../../../domain/repositories/IAccountsRepository';
import IUserAccountsRepository from '../../../domain/repositories/IUserAccountsRepository';
import IUsersRepository from '../../../domain/repositories/IUsersRepository';

type CreateUserDto = {
  name: string;
  email: string;
};

export type CreateUserOutput = { createdUser?: User; createdAccount?: Account };

export default class CreateUser {
  constructor(
    readonly usersRepository: IUsersRepository,
    readonly accountsRepository: IAccountsRepository,
    readonly userAccountsRepository: IUserAccountsRepository,
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
    });

    this.userAccountsRepository.assign({
      account_id: createdAccount.id,
      user_id: createdUser.id,
      is_owner: true,
    });

    return { createdUser, createdAccount };
  }
}
