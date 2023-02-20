import { format, lastDayOfMonth, parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import IExpensesRepository from '../../../domain/repositories/IExpensesRepository';

type RetrieveExpensesByMonthDto = {
  user_id: string;
  year_month: string;
  account_id?: string;
};

export default class RetrieveExpensesByDateRange {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    year_month,
    user_id,
    account_id,
  }: RetrieveExpensesByMonthDto): Promise<Expense[]> {
    const year_month_date = parseISO(`${year_month}-01`);

    const dateInterval = {
      start_date: new Date(format(year_month_date, 'yyyy-MM-01')),
      end_date: new Date(format(lastDayOfMonth(year_month_date), 'yyyy-MM-dd')),
    };

    const params = account_id
      ? {
          user_id,
          account_id,
          ...dateInterval,
        }
      : {
          user_id,
          ...dateInterval,
        };

    const expenses = await this.expensesRepository.findManyByDateRange(params);
    return expenses;
  }
}
