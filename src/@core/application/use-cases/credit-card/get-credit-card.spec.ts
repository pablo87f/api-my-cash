import { CreditCard } from '../../../domain/entities/credit-card';
import NotFoundError from '../../errors/not-found.error';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import GetCreditCard from './get-credit-card';

const makeSut = () => {
  const sut = new GetCreditCard(creditCardsRepositoryMock);
  return sut;
};

beforeEach(() => {
  creditCardsRepositoryMock.get.mockClear();
});

describe('Get credit card', () => {
  it('should get a credit card from an user', async () => {
    creditCardsRepositoryMock.get.mockResolvedValueOnce(
      new CreditCard({
        id: 'creditcard1',
        name: 'Cartão Nubank',
        total_limit: 1000,
        active: true,
        spent_amount: 200,
        user_id: 'user1',
      }),
    );

    const sut = makeSut();

    const creditCard: CreditCard = await sut.execute({
      credit_card_id: 'creditcard1',
      user_id: 'user1',
    });

    expect(creditCardsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.get).toHaveBeenCalledWith(
      'creditcard1',
      'user1',
    );
    expect(creditCard).toBeInstanceOf(CreditCard);
    expect(creditCard.user_id).toEqual('user1');
    expect(creditCard.id).toEqual('creditcard1');
  });

  it('should throw an error when dont find the credit card from the specific user', async () => {
    creditCardsRepositoryMock.get.mockResolvedValueOnce(undefined);

    const sut = makeSut();
    let error = undefined;

    try {
      await sut.execute({
        credit_card_id: 'creditcard1',
        user_id: 'user2',
      });
    } catch (e) {
      error = e;
    }

    expect(creditCardsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.get).toHaveBeenCalledWith(
      'creditcard1',
      'user2',
    );
    expect(error).toBeInstanceOf(NotFoundError);
  });
});
