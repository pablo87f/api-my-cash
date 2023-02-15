import { Purchase } from 'src/@core/domain/entities/purchase';
import IPurchasesRepository from 'src/@core/domain/repositories/IPurchasesRepository';
import IUserAccountsRepository from 'src/@core/domain/repositories/IUserAccountsRepository';

export type RetrievePurchasesByAccountDto = {
  account_id: string;
};

export default class RetrievePurchasesByAccount {
  constructor(
    readonly purchasesRepository: IPurchasesRepository,
    readonly userAccountsRepository: IUserAccountsRepository,
  ) {}

  async execute({
    account_id,
  }: RetrievePurchasesByAccountDto): Promise<Purchase[]> {
    const usersInAccounts = await this.userAccountsRepository.retrieve({
      account_id,
    });

    if (usersInAccounts && usersInAccounts.length > 0) {
      const userPurchasesPromises = usersInAccounts.map((userInAccount) =>
        this.purchasesRepository.retrieve({ user_id: userInAccount.user_id }),
      );

      const purchasesResults = await Promise.all(userPurchasesPromises);
      const purchases = purchasesResults.flat(1);

      return purchases;
    }
    return [];
  }
}
