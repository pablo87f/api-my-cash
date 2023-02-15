import { UserAccount } from '../entities/user-account';

export type AssingUserToAccountDto = {
  user_id: string;
  account_id: string;
  is_owner?: boolean;
};

export default interface IUserAccountsRepository {
  assign(assignUserToAccountDto: AssingUserToAccountDto): Promise<UserAccount>;
}
