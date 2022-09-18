import { Expense } from '../../domain/entities/expense';
import IExpensesRepository, {
  CreateRecurringBillExpenseDto,
} from '../../domain/repositories/IExpensesRepository';

export default class CreateRecurringBillExpense {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    due_date,
    name,
    amount,
    user_id,
    recurring_bill_id,
  }: CreateRecurringBillExpenseDto): Promise<Expense> {
    const createdExpense = await this.expensesRepository.createToRecurringBill({
      due_date,
      name,
      amount,
      recurring_bill_id,
      user_id,
    });
    return createdExpense;
  }
}
