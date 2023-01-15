import { RecurringBill } from '../../../domain/entities/recurring-bill';
import IRecurringBillsRepository from '../../../domain/repositories/IRecurringBillsRepository';
import CreateExpenseForRecurringBill from '../expense/create-expense-for-recurring-bill';

type CreateRecurringBillDto = {
  name: string;
  estimated_amount: number;
  user_id: string;
  due_date: Date;
};

type Output = RecurringBill;

export default class CreateRecurringBill {
  constructor(readonly recurringBillsRepository: IRecurringBillsRepository) {}

  async execute({
    due_date,
    name,
    estimated_amount,
    user_id,
  }: CreateRecurringBillDto): Promise<Output> {
    const createdRecurringBill = await this.recurringBillsRepository.create({
      name,
      estimated_amount,
      due_date,
      user_id,
    });

    return createdRecurringBill;
  }
}
