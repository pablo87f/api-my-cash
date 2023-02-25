import { Module } from '@nestjs/common';
import CreateWallet from 'src/@core/application/use-cases/wallet/create-wallet';
import GetUserWallet from 'src/@core/application/use-cases/wallet/get-user-wallet';
import RetrieveWalletsByUser from 'src/@core/application/use-cases/wallet/retrieve-wallets-by-user';
import UpdateUserWallet from 'src/@core/application/use-cases/wallet/update-user-wallet';
import PrismaWalletsRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-wallets-repository';
import IWalletsRepository from 'src/@core/domain/repositories/IWalletsRepository';
import { DbService } from 'src/database/db.service';
import { WalletsController } from './wallets.controller';

@Module({
  controllers: [WalletsController],
  providers: [
    DbService,
    {
      provide: PrismaWalletsRepository,
      useFactory: (db: DbService) => {
        return new PrismaWalletsRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: CreateWallet,
      useFactory: (walletsRepository: IWalletsRepository) => {
        return new CreateWallet(walletsRepository);
      },
      inject: [PrismaWalletsRepository],
    },
    {
      provide: RetrieveWalletsByUser,
      useFactory: (walletsRepository: IWalletsRepository) => {
        return new RetrieveWalletsByUser(walletsRepository);
      },
      inject: [PrismaWalletsRepository],
    },
    {
      provide: GetUserWallet,
      useFactory: (walletsRepository: IWalletsRepository) => {
        return new GetUserWallet(walletsRepository);
      },
      inject: [PrismaWalletsRepository],
    },
    {
      provide: UpdateUserWallet,
      useFactory: (
        getUserWallet: GetUserWallet,
        walletsRepository: IWalletsRepository,
      ) => {
        return new UpdateUserWallet(getUserWallet, walletsRepository);
      },
      inject: [GetUserWallet, PrismaWalletsRepository],
    },
  ],
})
export class WalletsModule {}
