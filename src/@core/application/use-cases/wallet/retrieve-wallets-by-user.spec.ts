import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import RetrieveWalletsByUser from './retrieve-wallets-by-user';

const makeSut = () => {
  const sut = new RetrieveWalletsByUser(walletsRepositoryMock);
  return sut;
};

describe('Retrieve wallets by user', () => {
  it('should retrieve the wallets by user', async () => {
    const fakeWallets = [
      new Wallet({
        amount: 200,
        name: 'Conta Inter',
        user_id: 'user1',
      }),
      new Wallet({
        amount: 200,
        name: 'Conta NuBank',
        user_id: 'user1',
      }),
    ];

    walletsRepositoryMock.retrieve.mockResolvedValueOnce(fakeWallets);

    const sut = makeSut();

    const wallets = await sut.execute({
      user_id: 'user1',
    });

    expect(walletsRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.retrieve).toHaveBeenCalledWith('user1');

    expect(wallets).toBeInstanceOf(Array<Wallet>);
    expect(wallets.length).toEqual(2);
  });
});
