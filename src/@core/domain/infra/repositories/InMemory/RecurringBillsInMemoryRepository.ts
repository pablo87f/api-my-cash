import { randomUUID } from 'crypto';
import { RecurringBill } from '../../../entities/recurring-bill';

import IRecurringBillsRepository, {
  CreateRecurringBillDto,
  UpdateRecurringBillDto,
} from '../../../repositories/IRecurringBillsRepository';

export default class RecurringBillsInMemoryRepository
  implements IRecurringBillsRepository
{
  private recurringBills: RecurringBill[];

  constructor() {
    this.recurringBills = [];
  }

  async update(
    id: string,
    updateRecurrringBillDto: UpdateRecurringBillDto,
  ): Promise<RecurringBill> {
    const recurringBillIndex = this.recurringBills.findIndex(
      (item) => item.id === id,
    );
    if (recurringBillIndex >= 0) {
      const found = this.recurringBills[recurringBillIndex];
      const updatedRecurringBill = new RecurringBill({
        name: found.name,
        estimated_amount: found.estimated_amount,
        due_date: found.due_date,
        ...found,
        ...updateRecurrringBillDto,
      });
      this.recurringBills[recurringBillIndex] = updatedRecurringBill;
      return updatedRecurringBill;
    } else {
      throw new Error('Recurring bill not found');
    }
  }

  async create({
    due_date,
    name,
    estimated_amount,
    user_id,
  }: CreateRecurringBillDto): Promise<RecurringBill> {
    const recurringBill = new RecurringBill({
      id: randomUUID(),
      active: true,
      due_date,
      expenses: [],
      name,
      estimated_amount,
      user_id,
    });
    this.recurringBills.push(recurringBill);
    return recurringBill;
  }
}
