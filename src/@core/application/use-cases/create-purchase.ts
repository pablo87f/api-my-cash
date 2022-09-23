import { PaymentMethod, Purchase } from 'src/@core/domain/entities/purchase';
import IPurchasesRepository from 'src/@core/domain/repositories/IPurchasesRepository';
import CreateExpenseForPurchase from './create-expense-for-purchase';
import CreatePurchasePortionsExpenses from './create-purchase-portions-expenses';

type Input = {
  name: string;
  portions: number;
  total_amount: number;
  user_id: string;
  due_date: Date;
  payment_method: PaymentMethod;
};

type Output = Purchase;

export default class CreatePurchase {
  constructor(
    readonly purchasesRepository: IPurchasesRepository,
    readonly createPurchasePortionsExpenses: CreatePurchasePortionsExpenses,
    readonly createPurchaseExpense: CreateExpenseForPurchase,
  ) {}

  async execute({
    due_date,
    name,
    payment_method,
    portions,
    total_amount,
    user_id,
  }: Input): Promise<Output> {
    const expenseAmount = total_amount / portions;

    const createdPurchase = await this.purchasesRepository.create({
      due_date,
      name,
      payment_method,
      portions,
      total_amount,
      user_id,
    });

    if (payment_method === 'CREDIT') {
      const portionExpenses = await this.createPurchasePortionsExpenses.execute(
        {
          purchase_id: createdPurchase.id,
          due_date,
          name,
          portions,
          total_amount,
          user_id,
        },
      );
      const purchase = await this.purchasesRepository.update(
        createdPurchase.id,
        {
          expenses: portionExpenses,
        },
      );
      return purchase;
    } else {
      // DEBIT
      const expense = await this.createPurchaseExpense.execute({
        amount: expenseAmount,
        name,
        due_date,
        user_id,
        purchase_id: createdPurchase.id,
      });
      const purchase = await this.purchasesRepository.update(
        createdPurchase.id,
        {
          expenses: [expense],
        },
      );
      return purchase;
    }
  }
}
