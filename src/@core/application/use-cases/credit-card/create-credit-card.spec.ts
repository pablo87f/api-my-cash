import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock, {
  createCreditCardInMemoryImpl,
} from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import CreateCreditCard from './create-credit-card';

const makeSut = () => {
  creditCardsRepositoryMock.create.mockImplementation(
    createCreditCardInMemoryImpl,
  );
  const sut = new CreateCreditCard(creditCardsRepositoryMock);
  return sut;
};

describe('Create credit card', () => {
  it('should create a credit card', async () => {
    const sut = makeSut();

    const creditCard: CreditCard = await sut.execute({
      name: 'Cartão Nubank',
      total_limit: 2000,
      user_id: 'user1',
    });

    expect(creditCard.name).toEqual('Cartão Nubank');
    expect(creditCard.total_limit).toEqual(2000);
    expect(creditCard.spent_amount).toEqual(0);
    expect(creditCard.remaining_limit).toEqual(2000);
  });

  it('should create a credit card with spent amount', async () => {
    const sut = makeSut();

    const creditCard: CreditCard = await sut.execute({
      name: 'Cartão Nubank',
      total_limit: 2000,
      spent_amount: 300,
      user_id: 'user1',
    });

    expect(creditCard.name).toEqual('Cartão Nubank');
    expect(creditCard.total_limit).toEqual(2000);
    expect(creditCard.spent_amount).toEqual(300);
    expect(creditCard.remaining_limit).toEqual(1700);
  });
});
