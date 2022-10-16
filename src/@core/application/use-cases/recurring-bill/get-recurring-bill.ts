import { RecurringBill } from '../../../domain/entities/recurring-bill';
import IRecurringBillsRepository from 'src/@core/domain/repositories/IRecurringBillsRepository';
import NotFoundError from '../../errors/not-found.error';

type Input = { id: string; user_id: string };

export default class GetRecurringBill {
  constructor(readonly recurringBillRepository: IRecurringBillsRepository) {}

  async execute({ id, user_id }: Input): Promise<RecurringBill> {
    const found = await this.recurringBillRepository.get(id, user_id);
    if (!found) {
      return undefined;
    }
    return found;
  }
}
