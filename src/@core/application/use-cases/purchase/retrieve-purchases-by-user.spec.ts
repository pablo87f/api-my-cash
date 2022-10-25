import { parseISO } from 'date-fns';
import { Purchase } from '../../../domain/entities/purchase';
import purchasesRepositoryMock from '../../../domain/repositories/__mocks__/purchases-repository.mock';
import RetrieveWalletsByUser from './retrieve-purchases-by-user';

const makeSut = () => {
  const sut = new RetrieveWalletsByUser(purchasesRepositoryMock);
  return sut;
};

describe('Retrieve purchases by user', () => {
  it('should retrieve the purchases by user', async () => {
    const fakePurchases = [
      new Purchase({
        total_amount: 200,
        name: 'Compra fribal',
        user_id: 'user1',
        payment_method: 'DEBIT',
        wallet_id: 'wallet1',
        due_date: parseISO('2022-10-02'),
      }),
      new Purchase({
        total_amount: 350,
        name: 'Compra Mateus',
        user_id: 'user1',
        payment_method: 'CREDIT',
        portions: 1,
        credit_card_id: 'creditcard1',
        due_date: parseISO('2022-10-03'),
      }),
    ];

    purchasesRepositoryMock.retrieve.mockResolvedValueOnce(fakePurchases);

    const sut = makeSut();

    const purchases = await sut.execute({
      user_id: 'user1',
    });

    expect(purchasesRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.retrieve).toHaveBeenCalledWith({
      user_id: 'user1',
    });

    expect(purchases).toBeInstanceOf(Array<Purchase>);
    expect(purchases.length).toEqual(2);
  });
});
