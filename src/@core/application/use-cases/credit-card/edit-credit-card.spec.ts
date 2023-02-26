import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import getCreditCardMock from '../__mocks__/get-credit-card.mock';
import EditCreditCard from './edit-credit-card';

const makeSut = () => {
  const sut = new EditCreditCard(creditCardsRepositoryMock, getCreditCardMock);
  return sut;
};

describe('Edit credit card', () => {
  it('should edit a credit card', async () => {
    getCreditCardMock.execute.mockResolvedValueOnce(
      new CreditCard({
        id: 'creditcard1',
        name: 'Cartão Nubank',
        total_limit: 1000,
        active: true,
        spent_amount: 200,
        user_id: 'user1',
      }),
    );
    creditCardsRepositoryMock.update.mockResolvedValueOnce(
      new CreditCard({
        id: 'creditcard1',
        name: 'Cartão NuConta',
        total_limit: 2000,
        active: true,
        spent_amount: 200,
        user_id: 'user1',
      }),
    );

    const sut = makeSut();

    const creditCard: CreditCard = await sut.execute({
      credit_card_id: 'creditcard1',
      user_id: 'user1',
      dataToUpdate: {
        name: 'Cartão NuConta',
        total_limit: 2000,
      },
    });

    expect(creditCard).toBeInstanceOf(CreditCard);
    expect(getCreditCardMock.execute).toHaveBeenCalledTimes(1);
    expect(getCreditCardMock.execute).toHaveBeenCalledWith({
      id: 'creditcard1',
      user_id: 'user1',
    });
    expect(creditCardsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.update).toHaveBeenCalledWith({
      id: 'creditcard1',
      dataToUpdate: {
        name: 'Cartão NuConta',
        total_limit: 2000,
      },
    });

    expect(creditCard.name).toEqual('Cartão NuConta');
    expect(creditCard.total_limit).toEqual(2000);
    expect(creditCard.spent_amount).toEqual(200);
  });
});
