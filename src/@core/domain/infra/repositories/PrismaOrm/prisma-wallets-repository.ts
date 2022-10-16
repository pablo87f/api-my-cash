import { Wallet } from 'src/@core/domain/entities/wallet';
import IWalletsRepository, {
  CreateWalletDto,
} from 'src/@core/domain/repositories/IWalletsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaWalletsRepository implements IWalletsRepository {
  constructor(readonly db: DbService) {}
  async retrieve(user_id: string): Promise<Wallet[]> {
    const wallets = await this.db.wallet.findMany({
      where: {
        user_id,
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
  get(id: string, user_id: string): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateWalletDto: Partial<Wallet>): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
}
