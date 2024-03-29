import { RecurringBill, RecurringBillProps } from '../entities/recurring-bill';

export type CreateRecurringBillDto = {
  name: string;
  estimated_amount: number;
  user_id: string;
  due_date: Date;
};

export type UpdateRecurringBillDto = Partial<RecurringBill>;

export type RetrieveRecurringBillsByMonthDto = {
  user_id: string;
  ref_month: Date;
};

export default interface IRecurringBillsRepository {
  create(
    createRecurringBillDto: CreateRecurringBillDto,
  ): Promise<RecurringBill>;

  update(
    id: string,
    updateRecurringBillDto: UpdateRecurringBillDto,
  ): Promise<RecurringBill>;

  get(id: string, user_id: string): Promise<RecurringBill>;

  retrieveByUser(user_id: string): Promise<RecurringBillProps[]>;
}
