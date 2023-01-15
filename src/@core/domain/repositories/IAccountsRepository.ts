import { Account } from '../entities/account';

export type CreateAccountDto = {
  name: string;
  users_ids: string[];
};

export type AccountFiltersDto = {
  id?: string;
  users_ids?: string;
};

export default interface IAccountsRepository {
  create(createAccountDto: CreateAccountDto): Promise<Account>;
  findOne(filters: AccountFiltersDto): Promise<Account | undefined>;
}
