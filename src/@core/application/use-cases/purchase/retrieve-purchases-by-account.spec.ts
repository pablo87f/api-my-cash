import userAccountsRepositoryMock from '../../../domain/repositories/__mocks__/user-accounts-repository.mock';
import purchasesRepositoryMock from '../../../domain/repositories/__mocks__/purchases-repository.mock';
import fakes from '../__fakes__/fakes';
import RetrievePurchasesByAccount from './retrieve-purchases-by-account';
import { Purchase } from '../../../domain/entities/purchase';

const makeSut = () => {
  const sut = new RetrievePurchasesByAccount(
    purchasesRepositoryMock,
    userAccountsRepositoryMock,
  );
  return sut;
};

describe('Retrieve purchases by account', () => {
  it('should retrieve all purchases from the users in the account', async () => {
    const emailKey = 'pablofern87@gmail.com';
    const fakeAccount = fakes.entities.accounts[emailKey];
    const fakeUser = fakes.entities.users[emailKey];
    const fakePurchases = fakes.entities.purchases[emailKey];
    const fakeUserAccout = fakes.entities.userAccounts[emailKey];

    userAccountsRepositoryMock.retrieve.mockResolvedValueOnce([fakeUserAccout]);
    purchasesRepositoryMock.retrieve.mockResolvedValueOnce(fakePurchases);

    const sut = makeSut();

    const purchases = await sut.execute({
      account_id: fakeAccount.id,
    });

    expect(userAccountsRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(userAccountsRepositoryMock.retrieve).toHaveBeenCalledWith({
      account_id: fakeAccount.id,
    });

    expect(purchasesRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.retrieve).toHaveBeenCalledWith({
      user_id: fakeUser.id,
    });

    expect(purchases).toBeInstanceOf(Array<Purchase>);
    expect(purchases.length).toEqual(2);
    expect(purchases[0].id).toEqual(fakePurchases[0].id);
    expect(purchases[0].name).toEqual(fakePurchases[0].name);
    expect(purchases[0].payment_method).toEqual(
      fakePurchases[0].payment_method,
    );
  });
});
