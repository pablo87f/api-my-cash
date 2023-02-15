import {
  UserAccount,
  UserAccountProps,
} from 'src/@core/domain/entities/user-account';
import IUserAccountsRepository, {
  AssingUserToAccountDto,
} from 'src/@core/domain/repositories/IUserAccountsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaUserAccountsRepository
  implements IUserAccountsRepository
{
  constructor(readonly db: DbService) {}
  retrieve(filters: Partial<UserAccountProps>): Promise<UserAccount[]> {
    throw new Error('Method not implemented.');
  }

  async assign({
    account_id,
    user_id,
    is_owner,
  }: AssingUserToAccountDto): Promise<UserAccount> {
    const userAccount = await this.db.usersOnAccounts.create({
      data: { account_id, user_id, is_owner },
    });
    return new UserAccount(userAccount);
  }
}
