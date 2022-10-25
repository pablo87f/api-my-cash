import { Expense } from '../../../domain/entities/expense';
import IExpensesRepository from '../../../domain/repositories/IExpensesRepository';

type Input = {
  user_id: string;
  ref_month: Date;
};

export default class RetriveExpensesByMonth {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({ ref_month, user_id }: Input): Promise<Expense[]> {
    const expenses = await this.expensesRepository.retrieve({
      user_id,
      ref_month,
    });

    return expenses;
  }
}
