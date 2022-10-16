import { RecurringBill } from '../../../domain/entities/recurring-bill';
import IRecurringBillsRepository from '../../../domain/repositories/IRecurringBillsRepository';

type Input = {
  user_id: string;
};

export default class RetrieveRecurringBillsByUser {
  constructor(readonly recurringBillsRepository: IRecurringBillsRepository) {}

  async execute({ user_id }: Input): Promise<RecurringBill[]> {
    const recurringBills = await this.recurringBillsRepository.retrieveByUser(
      user_id,
    );
    return recurringBills.map((props) => new RecurringBill(props));
  }
}
