import { Purchase } from '../../../domain/entities/purchase';
import IPurchasesRepository from '../../../domain/repositories/IPurchasesRepository';
import CreateExpenseForPurchase from '../expense/create-expense-for-purchase';
import PayWithDebitWallet from '../wallet/pay-with-debit-wallet';

type Input = {
  name: string;
  portions: number;
  total_amount: number;
  user_id: string;
  due_date: Date;
  wallet_id: string;
};

type Output = Purchase;

export default class CreatePurchaseWithDebitWallet {
  constructor(
    readonly purchasesRepository: IPurchasesRepository,
    readonly createExpenseForPurchase: CreateExpenseForPurchase,
    readonly payWithDebitWallet: PayWithDebitWallet,
  ) {}

  async execute({
    due_date,
    name,
    total_amount,
    user_id,
    wallet_id,
  }: Input): Promise<Output> {
    const createdPurchase = await this.purchasesRepository.create({
      due_date,
      name,
      payment_method: 'DEBIT',
      total_amount,
      user_id,
      payment_source_id: wallet_id,
    });

    const expense = await this.createExpenseForPurchase.execute({
      amount: total_amount,
      name,
      due_date,
      user_id,
      purchase_id: createdPurchase.id,
    });

    const purchase = await this.purchasesRepository.update(createdPurchase.id, {
      ...createdPurchase.props,
      expenses: [expense],
    });

    await this.payWithDebitWallet.execute({
      wallet_id,
      user_id,
      value_to_pay: total_amount,
    });

    return purchase;
  }
}
