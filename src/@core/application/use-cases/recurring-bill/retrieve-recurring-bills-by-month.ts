import { RecurringBill } from '../../../domain/entities/recurring-bill';
import IRecurringBillsRepository from '../../../domain/repositories/IRecurringBillsRepository';

type Input = {
  user_id: string;
  ref_month: Date;
};

export default class RetrieveRecurringBillsByMonth {
  constructor(readonly recurringBillsRepository: IRecurringBillsRepository) {}

  async execute({ user_id, ref_month }: Input): Promise<RecurringBill[]> {
    const recurringBills = await this.recurringBillsRepository.retrieveByMonth({
      ref_month,
      user_id,
    });
    return recurringBills.map((props) => new RecurringBill(props));
  }
}
