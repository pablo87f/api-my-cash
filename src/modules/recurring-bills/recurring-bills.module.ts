import { Module } from '@nestjs/common';
import CreateRecurringBill from 'src/@core/application/use-cases/recurring-bill/create-recurring-bill';
import RetrieveRecurringBillsByMonth from 'src/@core/application/use-cases/recurring-bill/retrieve-recurring-bills-by-month';
import PrismaRecurringBillsRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-recurring-bills-repository';
import IRecurringBillsRepository from 'src/@core/domain/repositories/IRecurringBillsRepository';
import { DbService } from 'src/database/db.service';
import { RecurringBillsController } from './recurring-bills.controller';

@Module({
  controllers: [RecurringBillsController],
  providers: [
    DbService,
    {
      provide: PrismaRecurringBillsRepository,
      useFactory: (db: DbService) => {
        return new PrismaRecurringBillsRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: RetrieveRecurringBillsByMonth,
      useFactory: (recurringBillsRepository: IRecurringBillsRepository) => {
        return new RetrieveRecurringBillsByMonth(recurringBillsRepository);
      },
      inject: [PrismaRecurringBillsRepository],
    },
    {
      provide: CreateRecurringBill,
      useFactory: (recurringBillsRepository: IRecurringBillsRepository) => {
        return new CreateRecurringBill(recurringBillsRepository);
      },
      inject: [PrismaRecurringBillsRepository],
    },
  ],
})
export class RecurringBillsModule {}
