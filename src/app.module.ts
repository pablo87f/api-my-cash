import { Module } from '@nestjs/common';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { UsersModule } from './modules/users/users.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { RecurringExpensesModule } from './modules/recurring-expenses/recurring-expenses.module';

@Module({
  imports: [
    UsersModule,
    PurchasesModule,
    ExpensesModule,
    RecurringExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
