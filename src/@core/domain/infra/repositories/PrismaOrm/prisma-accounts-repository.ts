import { Account } from 'src/@core/domain/entities/account';
import IAccountsRepository, {
  CreateAccountDto,
} from 'src/@core/domain/repositories/IAccountsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaAccountsRepository implements IAccountsRepository {
  constructor(readonly db: DbService) {}
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { name } = createAccountDto;

    const account = await this.db.account.create({ data: { name } });

    return new Account(account);
  }
}
