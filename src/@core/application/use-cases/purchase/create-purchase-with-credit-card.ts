import { Purchase } from '../../../domain/entities/purchase';
import IPurchasesRepository from '../../../domain/repositories/IPurchasesRepository';
import PayWithCreditCard from '../credit-card/pay-with-credit-card';
import CreateExpensesForPurchasePortions from '../expense/create-expenses-for-purchase-portions';

type Input = {
  name: string;
  portions: number;
  total_amount: number;
  user_id: string;
  due_date: Date;
  credit_card_id: string;
};

type Output = Purchase;

export default class CreatePurchaseWithCreditCard {
  constructor(
    readonly purchasesRepository: IPurchasesRepository,
    readonly createExpensesForPurchasePortions: CreateExpensesForPurchasePortions,
    readonly payWithCreditCard: PayWithCreditCard,
  ) {}

  async execute({
    due_date,
    name,
    portions,
    total_amount,
    user_id,
    credit_card_id,
  }: Input): Promise<Output> {
    const createdPurchase = await this.purchasesRepository.create({
      due_date,
      name,
      payment_method: 'CREDIT',
      portions,
      total_amount,
      user_id,
      credit_card_id,
    });

    await this.createExpensesForPurchasePortions.execute({
      purchase_id: createdPurchase.id,
      due_date,
      name,
      portions,
      total_amount,
      user_id,
    });

    await this.payWithCreditCard.execute({
      credit_card_id,
      user_id,
      value_to_pay: total_amount,
    });

    return createdPurchase;
  }
}
