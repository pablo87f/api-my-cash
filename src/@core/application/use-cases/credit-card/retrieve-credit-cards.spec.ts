import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import RetrieveCreditCards from './retrieve-credit-cards';

const makeSut = () => {
  const retrieveCreditCards = new RetrieveCreditCards(
    creditCardsRepositoryMock,
  );
  return retrieveCreditCards;
};

describe('Retrieve credit cards', () => {
  it('should retrieve the user credit cards', async () => {
    const fakeRetrievedCreditCards = [
      new CreditCard({
        name: 'Cartão Nubank',
        total_limit: 9000,
        id: 'creditcard1',
        user_id: 'user1',
      }),
      new CreditCard({
        name: 'Cartão Inter',
        total_limit: 2000,
        id: 'creditcard2',
        user_id: 'user1',
      }),
      new CreditCard({
        name: 'Cartão Neon',
        total_limit: 4000,
        id: 'creditcard3',
        user_id: 'user1',
      }),
    ];
    creditCardsRepositoryMock.retrieve.mockResolvedValueOnce(
      fakeRetrievedCreditCards,
    );
    const sut = makeSut();

    const retrivedCreditCards = await sut.execute('user1');

    expect(creditCardsRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.retrieve).toHaveBeenCalledWith('user1');

    expect(retrivedCreditCards).toBeInstanceOf(Array<CreditCard>);
    expect(retrivedCreditCards.length).toEqual(3);
  });
});
