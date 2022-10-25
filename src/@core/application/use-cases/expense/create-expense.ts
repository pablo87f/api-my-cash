import { Expense } from '../../../domain/entities/expense';
import IExpensesRepository, {
  CreateExpenseDto as CreateExpenseDto,
} from '../../../domain/repositories/IExpensesRepository';

export default class CreateExpenseWithDebitWallet {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    due_date,
    name,
    amount,
    user_id,
    purchase_id,
  }: CreateExpenseDto): Promise<Expense> {
    const createdExpense = await this.expensesRepository.create({
      due_date,
      name,
      amount,
      purchase_id,
      user_id,
    });
    return createdExpense;
  }
}
