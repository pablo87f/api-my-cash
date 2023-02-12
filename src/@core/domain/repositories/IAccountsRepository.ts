import { Account } from '../entities/account';

export type CreateAccountDto = {
  name: string;
  users_ids: string[];
  isOwner?: boolean;
};

export type AccountFiltersDto = {
  id?: string;
  name?: string;
};

export default interface IAccountsRepository {
  create(createAccountDto: CreateAccountDto): Promise<Account>;
}
