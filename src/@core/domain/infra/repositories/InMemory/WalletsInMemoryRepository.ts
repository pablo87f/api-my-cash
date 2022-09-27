import { randomUUID } from 'crypto';
import NotFoundError from '../../../../application/use-cases/errors/not-found.error';
import IWalletsRepository, {
  CreateWalletDto,
} from '../../../repositories/IWalletsRepository';
import { Wallet } from '../../../entities/wallet';

export default class WalletsInMemoryRepository implements IWalletsRepository {
  private wallets: Wallet[];

  constructor() {
    this.wallets = [];
  }
  async get(id: string): Promise<Wallet> {
    const found = this.wallets.find((wallet) => wallet.id === id);
    if (!found) {
      throw new NotFoundError();
    }
    return found;
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
