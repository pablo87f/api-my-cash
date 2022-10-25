import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { DbService } from 'src/database/db.service';
import { ExpensesService } from '../expenses/expenses.service';
import PrismaPurchasesRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-purchases-repository';
import CreatePurchaseWithDebitWallet from 'src/@core/application/use-cases/purchase/create-purchase-with-debit-wallet';
import IPurchasesRepository from 'src/@core/domain/repositories/IPurchasesRepository';
import CreateExpenseForPurchase from 'src/@core/application/use-cases/expense/create-expense-for-purchase';
import PayWithDebitWallet from 'src/@core/application/use-cases/wallet/pay-with-debit-wallet';
import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';
import PrismaExpensesRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-expenses-repository';
import IWalletsRepository from 'src/@core/domain/repositories/IWalletsRepository';
import PrismaWalletsRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-wallets-repository';
import RetrievePurchasesByUser from 'src/@core/application/use-cases/purchase/retrieve-purchases-by-user';

@Module({
  controllers: [PurchasesController],
  providers: [
    DbService,
    {
      provide: PrismaPurchasesRepository,
      useFactory: (db: DbService) => {
        return new PrismaPurchasesRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: PrismaExpensesRepository,
      useFactory: (db: DbService) => {
        return new PrismaExpensesRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: PrismaWalletsRepository,
      useFactory: (db: DbService) => {
        return new PrismaWalletsRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: CreateExpenseForPurchase,
      useFactory: (expensesRepository: IExpensesRepository) => {
        return new CreateExpenseForPurchase(expensesRepository);
      },
      inject: [PrismaExpensesRepository],
    },
    {
      provide: PayWithDebitWallet,
      useFactory: (walletsRepository: IWalletsRepository) => {
        return new PayWithDebitWallet(walletsRepository);
      },
      inject: [PrismaWalletsRepository],
    },
    {
      provide: CreatePurchaseWithDebitWallet,
      useFactory: (
        purchasesRepository: IPurchasesRepository,
        expensesRepository: IExpensesRepository,
        payWithDebitWallet: PayWithDebitWallet,
      ) => {
        return new CreatePurchaseWithDebitWallet(
          purchasesRepository,
          expensesRepository,
          payWithDebitWallet,
        );
      },
      inject: [
        PrismaPurchasesRepository,
        PrismaExpensesRepository,
        PayWithDebitWallet,
      ],
    },
    {
      provide: RetrievePurchasesByUser,
      useFactory: (purchasesRepository: IPurchasesRepository) => {
        return new RetrievePurchasesByUser(purchasesRepository);
      },
      inject: [PrismaPurchasesRepository],
    },
  ],
})
export class PurchasesModule {}
