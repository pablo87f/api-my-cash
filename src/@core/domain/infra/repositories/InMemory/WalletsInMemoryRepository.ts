import { randomUUID } from 'crypto';
import IWalletsRepository, {
  CreateWalletDto,
} from 'src/@core/domain/repositories/IWalletsRepository';
import { Wallet } from '../../../entities/wallet';

export default class WalletsInMemoryRepository implements IWalletsRepository {
  private wallets: Wallet[];

  constructor() {
    this.wallets = [];
  }

  async create({ amount, name, user_id }: CreateWalletDto): Promise<Wallet> {
    const wallet: Wallet = new Wallet({
      id: randomUUID(),
      amount,
      name,
      user_id,
    });

    this.wallets.push(wallet);
    return wallet;
  }
}
