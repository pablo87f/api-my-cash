import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DbService } from 'src/database/db.service';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, DbService],
})
export class ExpensesModule {}
