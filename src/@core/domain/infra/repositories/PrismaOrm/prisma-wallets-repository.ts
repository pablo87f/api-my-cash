import { Wallet } from 'src/@core/domain/entities/wallet';
import IWalletsRepository, {
  CreateWalletDto,
  FiltersWalletDto,
  UpdateWalletDto,
} from 'src/@core/domain/repositories/IWalletsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaWalletsRepository implements IWalletsRepository {
  constructor(readonly db: DbService) {}

  async findOne(filters: FiltersWalletDto): Promise<Wallet> {
    const wallet = await this.db.wallet.findFirst({
      where: {
        ...filters,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return new Wallet(wallet);
  }

  async find(filters: FiltersWalletDto): Promise<Wallet[]> {
    const wallets = await this.db.wallet.findMany({
      where: {
        ...filters,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return wallets.map((wallet) => new Wallet(wallet));
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = await this.db.wallet.create({
      data: {
        ...createWalletDto,
        active: true,
        created_at: new Date(),
      },
    });
    return new Wallet(wallet);
  }

  async update(updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const { id, dataToUpdate } = updateWalletDto;
    const { amount, name, active } = dataToUpdate;

    const updatedWallet = await this.db.wallet.update({
      where: {
        id,
      },
      data: {
        amount,
        name,
        active,
      },
    });
    return new Wallet(updatedWallet);
  }
  // async update(id: string, updateWalletDto: Partial<Wallet>): Promise<Wallet> {
  //   const updatedWallet = await this.db.wallet.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       ...updateWalletDto,
  //     },
  //   });
  //   return new Wallet(updatedWallet);
  // }
}
