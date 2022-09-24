import WalletsInMemoryRepository from '../../../domain/infra/repositories/InMemory/WalletsInMemoryRepository';
import { Wallet } from '../../../domain/entities/wallet';
import CreateWallet from './create-wallet';

describe('Create wallet', () => {
  it('should create a wallet', async () => {
    const walletInMemoryRepository = new WalletsInMemoryRepository();
    const createWallet = new CreateWallet(walletInMemoryRepository);

    const wallet: Wallet = await createWallet.execute({
      name: 'Conta Inter',
      amount: 2000,
      user_id: '1',
    });

    expect(wallet.name).toEqual('Conta Inter');
    expect(wallet.amount).toEqual(2000);
  });
});
