import { UserAccount, UserAccountProps } from '../entities/user-account';

export type AssingUserToAccountDto = {
  user_id: string;
  account_id: string;
  is_owner?: boolean;
};

export type UserAccountFilters = Partial<UserAccountProps>;

export default interface IUserAccountsRepository {
  assign(assignUserToAccountDto: AssingUserToAccountDto): Promise<UserAccount>;
  retrieve(filters: UserAccountFilters): Promise<UserAccount[]>;
}
