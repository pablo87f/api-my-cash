import { Wallet } from '../../../domain/entities/wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import fakes from '../__mocks__/_fakes';
import PayWithDebitWallet from './pay-with-debit-wallet';

const makeSut = () => {
  const sut = new PayWithDebitWallet(walletsRepositoryMock);
  return sut;
};

describe('Pay with debit wallet', () => {
  it('should pay with a debit wallet', async () => {
    const { pabloUserEmail } = fakes.constants;
    const [fakeWalletPablo] = fakes.entities.take<Wallet>(
      'wallets',
      pabloUserEmail,
      1,
    );

    const valueToPay = 100;

    const fakeUpdatedWallet = new Wallet({
      name: fakeWalletPablo.name,
      id: fakeWalletPablo.id,
      active: fakeWalletPablo.active,
      user_id: fakeWalletPablo.user_id,
      amount: fakeWalletPablo.amount - valueToPay,
    });

    walletsRepositoryMock.findOne.mockResolvedValueOnce(fakeWalletPablo);
    walletsRepositoryMock.update.mockResolvedValueOnce(fakeUpdatedWallet);

    const sut = makeSut();

    const updatedWallet: Wallet = await sut.execute({
      wallet_id: fakeWalletPablo.id,
      user_id: fakeWalletPablo.user_id,
      value_to_pay: valueToPay,
    });

    expect(walletsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      user_id: fakeWalletPablo.user_id,
    });

    expect(walletsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.update).toHaveBeenCalledWith({
      id: fakeWalletPablo.id,
      dataToUpdate: {
        amount: fakeWalletPablo.amount - valueToPay,
      },
    });

    expect(updatedWallet).toBeInstanceOf(Wallet);
    expect(updatedWallet.id).toEqual(fakeUpdatedWallet.id);
    expect(updatedWallet.amount).toEqual(fakeUpdatedWallet.amount);
  });
});
