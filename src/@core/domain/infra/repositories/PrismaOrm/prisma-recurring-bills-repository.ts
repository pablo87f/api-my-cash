import { endOfMonth, startOfMonth } from 'date-fns';
import {
  RecurringBill,
  RecurringBillProps,
} from 'src/@core/domain/entities/recurring-bill';
import { DbService } from 'src/database/db.service';
import IRecurringBillsRepository, {
  CreateRecurringBillDto,
  RetrieveRecurringBillsByMonthDto,
} from '../../../repositories/IRecurringBillsRepository';

export default class PrismaRecurringBillsRepository
  implements IRecurringBillsRepository
{
  constructor(readonly db: DbService) {}
  async create(
    createRecurringBillDto: CreateRecurringBillDto,
  ): Promise<RecurringBill> {
    const recurringBill = await this.db.recurringBill.create({
      data: {
        ...createRecurringBillDto,
      },
    });
    return new RecurringBill(recurringBill);
  }
  update(
    id: string,
    updateRecurringBillDto: Partial<RecurringBill>,
  ): Promise<RecurringBill> {
    throw new Error('Method not implemented.');
  }
  get(id: string, user_id: string): Promise<RecurringBill> {
    throw new Error('Method not implemented.');
  }
  retrieveByUser(user_id: string): Promise<RecurringBill[]> {
    throw new Error('Method not implemented.');
  }

  async retrieveByMonth({
    ref_month,
    user_id,
  }: RetrieveRecurringBillsByMonthDto): Promise<RecurringBillProps[]> {
    const recurringBills = await this.db.recurringBill.findMany({
      where: {
        user_id,
        due_date: {
          gte: startOfMonth(ref_month),
          lte: endOfMonth(ref_month),
        },
      },
    });
    return recurringBills;
  }
}
