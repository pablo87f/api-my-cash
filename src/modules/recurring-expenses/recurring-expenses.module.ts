import { Module } from '@nestjs/common';
import { RecurringExpensesService } from './recurring-expenses.service';
import { RecurringExpensesController } from './recurring-expenses.controller';
import { DbService } from 'src/database/db.service';

@Module({
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService, DbService],
})
export class RecurringExpensesModule {}
