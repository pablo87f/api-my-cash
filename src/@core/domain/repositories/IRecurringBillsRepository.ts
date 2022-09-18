import { RecurringBill } from '../entities/recurring-bill';

export type CreateRecurringBillDto = {
  name: string;
  estimated_amount: number;
  user_id: string;
  due_date: Date;
};

export type UpdateRecurringBillDto = Partial<RecurringBill>;

export default interface IRecurringBillsRepository {
  create(
    createRecurringBillDto: CreateRecurringBillDto,
  ): Promise<RecurringBill>;
  update(
    id: string,
    updateRecurringBillDto: UpdateRecurringBillDto,
  ): Promise<RecurringBill>;
}
