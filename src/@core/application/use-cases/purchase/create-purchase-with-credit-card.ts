import { addMonths } from 'date-fns';
import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';
import { Purchase } from '../../../domain/entities/purchase';
import IPurchasesRepository from '../../../domain/repositories/IPurchasesRepository';
import PayWithCreditCard from '../credit-card/pay-with-credit-card';

export type CreatePurchaseWithCreditCardDto = {
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
    readonly expensesRepository: IExpensesRepository,
    readonly payWithCreditCard: PayWithCreditCard,
  ) {}

  async execute({
    due_date,
    name,
    portions,
    total_amount,
    user_id,
    credit_card_id,
  }: CreatePurchaseWithCreditCardDto): Promise<Output> {
    const createdPurchase = await this.purchasesRepository.create({
      due_date,
      name,
      payment_method: 'CREDIT',
      portions,
      total_amount,
      user_id,
      credit_card_id,
    });

    const portionList = Array.from({ length: portions }, (_, i) => i + 1);
    const expenseAmount = total_amount / portions;
    const expenses = portionList.map((portion) => {
      const portionName = `${name} - ${portion}/${portions}`;
      return {
        amount: expenseAmount,
        name: portionName,
        due_date: addMonths(due_date, portion - 1),
        user_id,
        purchase_id: createdPurchase.id,
        credit_card_id,
      };
    });

    await this.expensesRepository.createMany(expenses);

    await this.payWithCreditCard.execute({
      credit_card_id,
      user_id,
      value_to_pay: total_amount,
    });

    return createdPurchase;
  }
}
