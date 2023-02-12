import { Account } from 'src/@core/domain/entities/account';
import IAccountsRepository, {
  CreateAccountDto,
} from 'src/@core/domain/repositories/IAccountsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaAccountsRepository implements IAccountsRepository {
  constructor(readonly db: DbService) {}
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { name, users_ids } = createAccountDto;

    const account = await this.db.account.create({ data: { name } });

    const usersAccountsData = users_ids.map((user_id) => {
      return { account_id: account.id, user_id };
    });

    // assign users to accounts
    this.db.usersOnAccounts.createMany({
      data: usersAccountsData,
    });

    return new Account(account);
  }
}
