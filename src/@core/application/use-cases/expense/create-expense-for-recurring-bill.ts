import { Expense } from '../../../domain/entities/expense';
import IExpensesRepository, {
  CreateExpenseForRecurringBillDto as CreateExpenseForRecurringBillDto,
} from '../../../domain/repositories/IExpensesRepository';

export default class CreateExpenseForRecurringBill {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    due_date,
    name,
    amount,
    user_id,
    recurring_bill_id,
  }: CreateExpenseForRecurringBillDto): Promise<Expense> {
    const createdExpense = await this.expensesRepository.create({
      due_date,
      name,
      amount,
      recurring_bill_id,
      user_id,
    });
    return createdExpense;
  }
}
