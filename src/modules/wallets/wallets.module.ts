import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { DbService } from 'src/database/db.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, DbService],
})
export class WalletsModule {}
