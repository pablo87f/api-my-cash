import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DbService } from 'src/database/db.service';
import RetrieveExpensesByDateRange from 'src/@core/application/use-cases/expense/retrieve-expenses-by-month';
import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';
import PrismaExpensesRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-expenses-repository';

@Module({
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    DbService,
    PrismaExpensesRepository,
    {
      provide: RetrieveExpensesByDateRange,
      useFactory: (expensesRepository: IExpensesRepository) => {
        return new RetrieveExpensesByDateRange(expensesRepository);
      },
      inject: [PrismaExpensesRepository],
    },
  ],
})
export class ExpensesModule {}
