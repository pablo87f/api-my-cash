import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import PayWithCreditCard from './pay-with-credit-card';

const makeSut = () => {
  const sut = new PayWithCreditCard(creditCardsRepositoryMock);
  return sut;
};

describe('Pay with credit card', () => {
  it('should pay with a credit card', async () => {
    const fakeFoundCreditCard = new CreditCard({
      name: 'Cartão Nubank',
      total_limit: 1000,
      user_id: 'user1',
      id: 'creditcard1',
    });

    creditCardsRepositoryMock.get.mockResolvedValue(fakeFoundCreditCard);

    creditCardsRepositoryMock.update.mockImplementation(
      async (credit_card_id, updateCreditCardDto) => {
        return new CreditCard({
          id: credit_card_id,
          name: 'Cartão Nubank',
          total_limit: 1000,
          user_id: 'user1',
          ...updateCreditCardDto,
        });
      },
    );

    const sut = makeSut();

    const creditCard: CreditCard = await sut.execute({
      credit_card_id: 'creditcard1',
      user_id: 'user1',
      value_to_pay: 300,
    });

    expect(creditCardsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.get).toHaveBeenCalledWith(
      'creditcard1',
      'user1',
    );

    expect(creditCardsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.update).toHaveBeenCalledWith(
      'creditcard1',
      {
        id: 'creditcard1',
        name: 'Cartão Nubank',
        total_limit: 1000,
        user_id: 'user1',
        spent_amount: 300,
      },
    );

    expect(creditCard.spent_amount).toEqual(300);
    expect(creditCard.remaining_limit).toEqual(700);
  });
});
