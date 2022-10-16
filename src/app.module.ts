import { Module } from '@nestjs/common';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { RecurringExpensesModule } from './modules/recurring-expenses/recurring-expenses.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { RecurringBillsModule } from './modules/recurring-bills/recurring-bills.module';

@Module({
  imports: [
    UsersModule,
    PurchasesModule,
    WalletsModule,
    ExpensesModule,
    RecurringExpensesModule,
    RecurringBillsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
