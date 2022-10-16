import { Expense } from 'src/@core/domain/entities/expense';
import IExpensesRepository, {
  CreateExpenseForPurchaseDto,
  CreateExpenseForRecurringBillDto,
  RetrieveByMonthDto,
} from 'src/@core/domain/repositories/IExpensesRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaExpensesRepository implements IExpensesRepository {
  constructor(readonly db: DbService) {}
  bulkCreateForPurchase(
    createPurchaseExpenseDto: CreateExpenseForPurchaseDto[],
  ): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
  createForPurchase(
    createExpenseForPurchaseDto: CreateExpenseForPurchaseDto,
  ): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  createToRecurringBill(
    createRecurringBillExpenseDto: CreateExpenseForRecurringBillDto,
  ): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  retrieve(user_id: string): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
  retrieveByMonth(filters: RetrieveByMonthDto): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateExpenseDto: Partial<Expense>): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  get(id: string, user_id: string): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
}
