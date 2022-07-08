import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { DbService } from 'src/database/db.service';
import { ExpensesService } from '../expenses/expenses.service';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService, DbService, ExpensesService],
})
export class PurchasesModule {}
