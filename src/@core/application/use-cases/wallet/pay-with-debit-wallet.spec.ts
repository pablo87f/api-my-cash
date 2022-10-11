import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import PayWithDebitWallet from './pay-with-debit-wallet';

const makeSut = () => {
  const sut = new PayWithDebitWallet(walletsRepositoryMock);
  return sut;
};

describe('Pay with debit wallet', () => {
  it('should pay with a debit wallet', async () => {
    const fakeFoundWallet = new Wallet({
      name: 'NuConta',
      amount: 1000,
      user_id: 'user1',
      id: 'wallet1',
    });

    walletsRepositoryMock.get.mockResolvedValue(fakeFoundWallet);

    walletsRepositoryMock.update.mockImplementation(
      async (wallet_id, updateWalletDto) => {
        return new Wallet({
          id: wallet_id,
          name: 'NuConta',
          amount: 700,
          user_id: 'user1',
          ...updateWalletDto,
        });
      },
    );

    const sut = makeSut();

    const wallet: Wallet = await sut.execute({
      wallet_id: 'wallet1',
      user_id: 'user1',
      value_to_pay: 300,
    });

    expect(walletsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.get).toHaveBeenCalledWith('wallet1', 'user1');

    expect(walletsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.update).toHaveBeenCalledWith('wallet1', {
      id: 'wallet1',
      name: 'NuConta',
      amount: 700,
      user_id: 'user1',
      active: true,
    });

    expect(wallet).toBeInstanceOf(Wallet);
    expect(wallet.id).toEqual('wallet1');
    expect(wallet.amount).toEqual(700);
  });
});
