import { Expense } from '../entities/expense';

export type CreateExpenseDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  purchase_id?: string;
  recurring_bill_id?: string;
  wallet_id?: string;
  credit_card_id?: string;
};

export type CreateExpenseForRecurringBillDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  recurring_bill_id: string;
};

export type RetrieveDto = {
  user_id: string;
  ref_month?: Date;
};

export default interface IExpensesRepository {
  bulkCreateForPurchase(
    createPurchaseExpenseDto: CreateExpenseDto[],
  ): Promise<Expense[]>;

  create(createExpenseForPurchaseDto: CreateExpenseDto): Promise<Expense>;

  createMany(createExpenseForPurchaseDto: CreateExpenseDto[]): Promise<number>;

  retrieve(filters: RetrieveDto): Promise<Expense[]>;

  update(id: string, updateExpenseDto: Partial<Expense>): Promise<Expense>;

  get(id: string, user_id: string): Promise<Expense>;
}
