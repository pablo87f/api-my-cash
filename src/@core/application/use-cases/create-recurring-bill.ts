import { RecurringBill } from '../../domain/entities/recurring-bill';
import IRecurringBillsRepository from '../../domain/repositories/IRecurringBillsRepository';
import CreateExpenseForRecurringBill from './expense/create-expense-for-recurring-bill';

type Input = {
  name: string;
  estimated_amount: number;
  user_id: string;
  due_date: Date;
};

type Output = RecurringBill;

export default class CreateRecurringBill {
  constructor(
    readonly recurringBillsRepository: IRecurringBillsRepository,
    readonly createRecurringBillExpense: CreateExpenseForRecurringBill,
  ) {}

  async execute({
    due_date,
    name,
    estimated_amount,
    user_id,
  }: Input): Promise<Output> {
    const createdRecurringBill = await this.recurringBillsRepository.create({
      name,
      estimated_amount,
      due_date,
      user_id,
    });

    // DEBIT
    const expense = await this.createRecurringBillExpense.execute({
      amount: estimated_amount,
      name,
      due_date,
      user_id,
      recurring_bill_id: createdRecurringBill.id,
    });

    const recurringBill = await this.recurringBillsRepository.update(
      createdRecurringBill.id,
      {
        expenses: [expense],
      },
    );
    return recurringBill;
  }
}
