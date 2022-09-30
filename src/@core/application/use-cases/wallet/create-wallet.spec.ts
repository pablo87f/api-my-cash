import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../__mocks__/repositories/wallets-repository.mock';
import CreateWallet from './create-wallet';

describe('Create wallet', () => {
  it('should create a wallet', async () => {
    walletsRepositoryMock.create.mockResolvedValue(
      new Wallet({
        name: 'Conta Inter',
        amount: 2000,
        user_id: '1',
      }),
    );

    const createWallet = new CreateWallet(walletsRepositoryMock);

    const wallet: Wallet = await createWallet.execute({
      name: 'Conta Inter',
      amount: 2000,
      user_id: '1',
    });

    expect(walletsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.create).toHaveBeenCalledWith({
      name: 'Conta Inter',
      amount: 2000,
      user_id: '1',
    });

    expect(wallet.name).toEqual('Conta Inter');
    expect(wallet.amount).toEqual(2000);
  });
});
