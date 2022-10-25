import { Expense } from 'src/@core/domain/entities/expense';
import IExpensesRepository, {
  CreateExpenseDto,
  RetrieveDto,
} from 'src/@core/domain/repositories/IExpensesRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaExpensesRepository implements IExpensesRepository {
  constructor(readonly db: DbService) {}
  async createMany(
    createExpenseForPurchaseDto: CreateExpenseDto[],
  ): Promise<number> {
    const expenses = await this.db.expense.createMany({
      data: createExpenseForPurchaseDto,
    });

    return expenses.count;
  }
  bulkCreateForPurchase(
    createPurchaseExpenseDto: CreateExpenseDto[],
  ): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }

  async create({
    amount,
    due_date,
    name,
    user_id,
    purchase_id,
    recurring_bill_id,
    wallet_id,
    credit_card_id,
  }: CreateExpenseDto): Promise<Expense> {
    const expense = await this.db.expense.create({
      data: {
        amount,
        name,
        due_date,
        user_id,
        purchase_id,
        recurring_bill_id,
        wallet_id,
        credit_card_id,
      },
    });

    return new Expense(expense);
  }
  retrieve({ user_id, ref_month }: RetrieveDto): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateExpenseDto: Partial<Expense>): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  get(id: string, user_id: string): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
}
