import { addMonths } from 'date-fns';
import { Expense } from '../../domain/entities/expense';
import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';

type Input = {
  portions: number;
  name: string;
  total_amount: number;
  due_date: Date;
  user_id: string;
  purchase_id: string;
};

type Output = Expense[];

export default class CreateExpensesForPurchasePortions {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    portions,
    name,
    total_amount,
    due_date,
    user_id,
    purchase_id,
  }: Input): Promise<Output> {
    const portionList = Array.from({ length: portions }, (_, i) => i + 1);
    const expenseAmount = total_amount / portions;
    const expensesForPurchasePortions = portionList.map((portion) => {
      const portionName = `${name} - ${portion}/${portions}`;
      return {
        amount: expenseAmount,
        name: portionName,
        due_date: addMonths(due_date, portion),
        user_id,
        purchase_id,
      };
    });

    const createdExpenses = await this.expensesRepository.bulkCreateForPurchase(
      expensesForPurchasePortions,
    );

    return createdExpenses;
  }
}
