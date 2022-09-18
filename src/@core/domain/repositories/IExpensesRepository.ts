import { Expense } from '../entities/expense';

export type CreatePurchaseExpenseDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  purchase_id: string;
};

export type CreateRecurringBillExpenseDto = {
  amount: number;
  name: string;
  due_date: Date;
  user_id: string;
  recurring_bill_id: string;
};

export default interface IExpensesRepository {
  bulkCreateForPurchase(
    createPurchaseExpenseDto: CreatePurchaseExpenseDto[],
  ): Promise<Expense[]>;

  createForPurchase(
    createPurchaseExpenseDto: CreatePurchaseExpenseDto,
  ): Promise<Expense>;

  createToRecurringBill(
    createRecurringBillExpenseDto: CreateRecurringBillExpenseDto,
  ): Promise<Expense>;
}
