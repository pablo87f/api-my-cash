import { Expense } from '../../domain/entities/expense';
import IExpensesRepository, {
  CreatePurchaseExpenseDto,
} from '../../domain/repositories/IExpensesRepository';

export default class CreatePurchaseExpense {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute({
    due_date,
    name,
    amount,
    user_id,
    purchase_id,
  }: CreatePurchaseExpenseDto): Promise<Expense> {
    const createdExpense = await this.expensesRepository.createForPurchase({
      due_date,
      name,
      amount,
      purchase_id,
      user_id,
    });
    return createdExpense;
  }
}
