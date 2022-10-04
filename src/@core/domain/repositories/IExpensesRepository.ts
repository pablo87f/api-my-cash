import { Expense } from '../entities/expense';

export type CreateExpenseForPurchaseDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  purchase_id: string;
};

export type CreateExpenseForRecurringBillDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  recurring_bill_id: string;
};

export default interface IExpensesRepository {
  bulkCreateForPurchase(
    createPurchaseExpenseDto: CreateExpenseForPurchaseDto[],
  ): Promise<Expense[]>;

  createForPurchase(
    createExpenseForPurchaseDto: CreateExpenseForPurchaseDto,
  ): Promise<Expense>;

  createToRecurringBill(
    createRecurringBillExpenseDto: CreateExpenseForRecurringBillDto,
  ): Promise<Expense>;

  retrieve(user_id: string);

  update(id: string, updateExpenseDto: Partial<Expense>): Promise<Expense>;

  get(id: string, user_id: string);
}
