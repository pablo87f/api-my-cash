import { User } from '../../../domain/entities/user';
import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import getUserWalletMock from '../__mocks__/get-user-wallet.mock';
import fakes from '../__mocks__/_fakes';
import UpdateUserWallet from './update-user-wallet';

const makeSut = () => {
  const sut = new UpdateUserWallet(getUserWalletMock, walletsRepositoryMock);
  return sut;
};
beforeEach(() => {
  getUserWalletMock.execute.mockClear();
  walletsRepositoryMock.update.mockClear();
});

describe('Update user wallet', () => {
  it('should return the updated wallet', async () => {
    const { pabloUserEmail } = fakes.constants;
    const fakeUserPablo: User = fakes.entities.users[pabloUserEmail];
    const [fakeWalletPablo] = fakes.entities.take<Wallet>(
      'wallets',
      pabloUserEmail,
      1,
    );

    const valueToIncreseInWalletAmount = 100;

    const fakeUpdatedWallet: Wallet = new Wallet({
      ...fakeUserPablo.props,
      amount: fakeWalletPablo.amount + valueToIncreseInWalletAmount,
    });
    getUserWalletMock.execute.mockResolvedValueOnce(fakeWalletPablo);
    walletsRepositoryMock.update.mockResolvedValueOnce(fakeUpdatedWallet);

    const sut = makeSut();
    const updatedWallet = await sut.execute({
      id: fakeWalletPablo.id,
      user_id: fakeUserPablo.id,
      dataToUpdate: {
        amount: fakeWalletPablo.amount + valueToIncreseInWalletAmount,
      },
    });

    expect(getUserWalletMock.execute).toHaveBeenCalledTimes(1);
    expect(getUserWalletMock.execute).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      user_id: fakeUserPablo.id,
    });

    expect(walletsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.update).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      dataToUpdate: {
        amount: fakeWalletPablo.amount + valueToIncreseInWalletAmount,
      },
    });

    expect(updatedWallet).toBeInstanceOf(Wallet);
    expect(updatedWallet.amount).toEqual(fakeUpdatedWallet.amount);
  });

  it('should return undefined when the wallet is not from that user', async () => {
    const { pabloUserEmail, jackUserEmail } = fakes.constants;
    const fakeUserJack = fakes.entities.users[jackUserEmail];
    const [fakeWalletPablo] = fakes.entities.take<Wallet>(
      'wallets',
      pabloUserEmail,
      1,
    );

    getUserWalletMock.execute.mockResolvedValueOnce(undefined);
    const valueToIncreseInWalletAmount = 100;

    const sut = makeSut();
    const updatedWallet = await sut.execute({
      id: fakeWalletPablo.id,
      user_id: fakeUserJack.id,
      dataToUpdate: {
        amount: fakeWalletPablo.amount + valueToIncreseInWalletAmount,
      },
    });

    expect(getUserWalletMock.execute).toHaveBeenCalledTimes(1);
    expect(getUserWalletMock.execute).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      user_id: fakeUserJack.id,
    });
    expect(updatedWallet).toBeUndefined();
  });
});
