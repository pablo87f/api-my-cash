import { randomUUID } from 'crypto';
import { Expense } from '../../../entities/expense';
import IExpensesRepository, {
  CreatePurchaseExpenseDto,
  CreateRecurringBillExpenseDto,
} from '../../../repositories/IExpensesRepository';

export default class ExpensesInMemoryRepository implements IExpensesRepository {
  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  async createToRecurringBill({
    amount,
    due_date,
    name,
    user_id,
    recurring_bill_id,
  }: CreateRecurringBillExpenseDto): Promise<Expense> {
    const expense: Expense = new Expense({
      amount,
      due_date,
      name,
      user_id,
      recurring_bill_id,
      id: randomUUID(),
    });

    this.expenses.push(expense);
    return expense;
  }

  async createForPurchase({
    amount,
    due_date,
    name,
    user_id,
    purchase_id,
  }: CreatePurchaseExpenseDto): Promise<Expense> {
    const expense: Expense = new Expense({
      amount,
      due_date,
      name,
      user_id,
      purchase_id,
      id: randomUUID(),
    });

    this.expenses.push(expense);
    return expense;
  }

  async bulkCreateForPurchase(
    createPurchaseExpenseDto: CreatePurchaseExpenseDto[],
  ): Promise<Expense[]> {
    const createdExpenses = createPurchaseExpenseDto.map(
      ({ amount, due_date, name, user_id, purchase_id }) => {
        const expense: Expense = new Expense({
          amount,
          due_date,
          name,
          user_id,
          purchase_id,
          id: randomUUID(),
        });

        return expense;
      },
    );
    this.expenses = [...this.expenses, ...createdExpenses];
    return createdExpenses;
  }
}
