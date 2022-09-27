import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../__mocks__/repositories/credit-cards-repository.mock';
import PayWithCreditCard from './pay-with-credit-card';

const makeSut = () => {
  const sut = new PayWithCreditCard(creditCardsRepositoryMock);
  return sut;
};

describe('Pay with credit card', () => {
  it('should pay with a credit card', async () => {
    creditCardsRepositoryMock.get.mockResolvedValue(
      new CreditCard({
        name: 'Cartão Nubank',
        total_limit: 1000,
        user_id: 'user1',
        id: 'creditcard1',
      }),
    );

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

    expect(creditCard.spent_amount).toEqual(300);
    expect(creditCard.remaining_limit).toEqual(700);
  });
});
