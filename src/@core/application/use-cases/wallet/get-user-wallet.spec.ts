import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import fakes from '../__mocks__/_fakes';
import GetUserWallet from './get-user-wallet';

const makeSut = () => {
  const sut = new GetUserWallet(walletsRepositoryMock);
  return sut;
};
beforeEach(() => {
  walletsRepositoryMock.findOne.mockClear();
});

describe('Get user wallet', () => {
  it('should get wallet by id when the wallet is from that user', async () => {
    const userEmail = fakes.constants.pabloUserEmail;
    const fakeUser = fakes.entities.users[userEmail];
    const [fakeWallet] = fakes.entities.take<Wallet>('wallets', userEmail, 1);

    walletsRepositoryMock.findOne.mockResolvedValueOnce(fakeWallet);

    const sut = makeSut();

    const wallet = await sut.execute({
      id: fakeWallet.id,
      user_id: fakeUser.id,
    });

    expect(walletsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeWallet.id,
      user_id: fakeUser.id,
    });

    expect(wallet).toBeInstanceOf(Wallet);
    expect(wallet.user_id).toEqual(fakeUser.id);
  });

  it('should return undefined when the wallet is not from that user', async () => {
    const { pabloUserEmail, jackUserEmail } = fakes.constants;
    const fakeUserJack = fakes.entities.users[jackUserEmail];
    const [fakeWalletPablo] = fakes.entities.take<Wallet>(
      'wallets',
      pabloUserEmail,
      1,
    );

    walletsRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    const sut = makeSut();

    const wallet = await sut.execute({
      id: fakeWalletPablo.id,
      user_id: fakeUserJack.id,
    });

    expect(walletsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      user_id: fakeUserJack.id,
    });

    expect(wallet).toBeUndefined();
  });
});
