import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';
import { Purchase } from '../../../domain/entities/purchase';
import IPurchasesRepository from '../../../domain/repositories/IPurchasesRepository';
import PayWithDebitWallet from '../wallet/pay-with-debit-wallet';

export type CreatePurchaseWithDebitWalletDto = {
  name: string;
  total_amount: number;
  user_id: string;
  due_date: Date;
  wallet_id: string;
};

type Output = Purchase;

export default class CreatePurchaseWithDebitWallet {
  constructor(
    readonly purchasesRepository: IPurchasesRepository,
    readonly expensesRepository: IExpensesRepository,
    readonly payWithDebitWallet: PayWithDebitWallet,
  ) {}

  async execute({
    due_date,
    name,
    total_amount,
    user_id,
    wallet_id,
  }: CreatePurchaseWithDebitWalletDto): Promise<Output> {
    const createdPurchase = await this.purchasesRepository.create({
      due_date,
      name,
      payment_method: 'DEBIT',
      total_amount,
      user_id,
      wallet_id,
    });

    await this.expensesRepository.create({
      amount: total_amount,
      name,
      due_date,
      user_id,
      purchase_id: createdPurchase.id,
      wallet_id,
    });

    await this.payWithDebitWallet.execute({
      wallet_id,
      user_id,
      value_to_pay: total_amount,
    });

    return createdPurchase;
  }
}
