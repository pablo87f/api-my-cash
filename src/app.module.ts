import { Module } from '@nestjs/common';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { RecurringExpensesModule } from './modules/recurring-expenses/recurring-expenses.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { RecurringBillsModule } from './modules/recurring-bills/recurring-bills.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    PurchasesModule,
    WalletsModule,
    ExpensesModule,
    RecurringExpensesModule,
    RecurringBillsModule,
    CreditCardsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
