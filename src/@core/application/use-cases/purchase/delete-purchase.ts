import { Purchase } from '../../../domain/entities/purchase';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';
import IPurchasesRepository from '../../../domain/repositories/IPurchasesRepository';
import IWalletsRepository from '../../../domain/repositories/IWalletsRepository';

export default class DeletePurchase {
  constructor(
    private readonly purchasesRepository: IPurchasesRepository,
    private readonly walletsRepository: IWalletsRepository,
    private readonly creditCardsRepository: ICreditCardsRepository,
  ) {}

  async execute(id: string, user_id: string): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findOne(id);

    // console.log('AQUI=>', purchase);
    if (purchase.payment_method === 'DEBIT') {
      const wallet = await this.walletsRepository.findOne({
        id: purchase.wallet_id,
        user_id,
      });
      await this.walletsRepository.update({
        id: purchase.wallet_id,
        dataToUpdate: {
          amount: wallet.amount + purchase.total_amount,
        },
      });
    } else {
      const credit_card = await this.creditCardsRepository.findOne({
        id: purchase.credit_card_id,
        user_id,
      });
      await this.creditCardsRepository.update(purchase.credit_card_id, {
        spent_amount: credit_card.spent_amount - purchase.total_amount,
      });
    }
    const deleted = await this.purchasesRepository.delete(id);
    return deleted;
  }
}
