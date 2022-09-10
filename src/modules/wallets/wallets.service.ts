import { Injectable } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private db: DbService) {}

  async create({ name, amount, user_id }: CreateWalletDto) {
    const wallet = await this.db.wallet.create({
      data: {
        name,
        amount,
        user_id,
        created_at: new Date(),
      },
    });
    return wallet;
  }

  async findAll(user_id: string) {
    const wallets = await this.db.wallet.findMany({
      where: {
        user_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return wallets;
  }

  async findOne(id: string) {
    const wallet = await this.db.wallet.findUnique({
      where: {
        id,
      },
    });
    return wallet;
  }

  async update(id: string, { name, amount, user_id }: UpdateWalletDto) {
    const wallet = await this.db.wallet.update({
      data: {
        updated_at: new Date(),
        id,
        name,
        amount,
        user_id,
      },
      where: {
        id,
      },
    });

    return wallet;
  }

  async remove(id: string) {
    const wallet = await this.findOne(id);
    if (wallet) {
      const deletedWallet = await this.db.wallet.delete({
        where: {
          id,
        },
      });

      return deletedWallet;
    }
    return undefined;
  }
}
