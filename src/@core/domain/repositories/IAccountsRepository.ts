import { Account } from '../entities/account';

export type CreateAccountDto = {
  name: string;
};

export type AccountFiltersDto = {
  id?: string;
  name?: string;
};

export default interface IAccountsRepository {
  create(createAccountDto: CreateAccountDto): Promise<Account>;
}
