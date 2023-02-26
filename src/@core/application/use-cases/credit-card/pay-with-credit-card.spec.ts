import { User } from '../../../domain/entities/user';
import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import fakes from '../__mocks__/_fakes';
import PayWithCreditCard from './pay-with-credit-card';

const makeSut = () => {
  const sut = new PayWithCreditCard(creditCardsRepositoryMock);
  return sut;
};

beforeEach(() => {
  creditCardsRepositoryMock.findOne.mockClear();
  creditCardsRepositoryMock.update.mockClear();
});

describe('Pay with credit card', () => {
  it('should pay with a credit card', async () => {
    // given
    const VALUE_TO_PAY = 300;

    const { pabloUserEmail } = fakes.constants;
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );
    const fakeUpdatedCreditCard = new CreditCard({
      ...fakeCreditCardPablo.props,
      total_limit: fakeCreditCardPablo.total_limit - VALUE_TO_PAY,
      spent_amount: fakeCreditCardPablo.spent_amount + VALUE_TO_PAY,
    });

    creditCardsRepositoryMock.findOne.mockResolvedValue(fakeCreditCardPablo);

    creditCardsRepositoryMock.update.mockResolvedValueOnce(
      fakeUpdatedCreditCard,
    );

    // when
    const sut = makeSut();
    const creditCard: CreditCard = await sut.execute({
      credit_card_id: fakeCreditCardPablo.id,
      user_id: fakeCreditCardPablo.user_id,
      value_to_pay: VALUE_TO_PAY,
    });

    // then
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeCreditCardPablo.id,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCardsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.update).toHaveBeenCalledWith({
      id: fakeUpdatedCreditCard.id,
      dataToUpdate: {
        spent_amount: fakeUpdatedCreditCard.spent_amount,
      },
    });

    expect(creditCard.id).toEqual(fakeUpdatedCreditCard.id);
    expect(creditCard.user_id).toEqual(fakeUpdatedCreditCard.user_id);
    expect(creditCard.spent_amount).toEqual(fakeUpdatedCreditCard.spent_amount);
    // expect(creditCard.total_limit).toEqual(fakeUpdatedCreditCard.total_limit);
    expect(creditCard.remaining_limit).toEqual(
      fakeUpdatedCreditCard.remaining_limit,
    );
  });

  it('should return undefined if the credit card was not found for that user', async () => {
    // given
    const VALUE_TO_PAY = 300;

    const { pabloUserEmail, jackUserEmail } = fakes.constants;
    const fakeUserJack: User = fakes.entities.users[jackUserEmail];
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );

    creditCardsRepositoryMock.findOne.mockResolvedValue(undefined);

    // when
    const sut = makeSut();
    const creditCard: CreditCard = await sut.execute({
      credit_card_id: fakeCreditCardPablo.id,
      user_id: fakeUserJack.id,
      value_to_pay: VALUE_TO_PAY,
    });

    // then
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeCreditCardPablo.id,
      user_id: fakeUserJack.id,
    });

    expect(creditCardsRepositoryMock.update).toHaveBeenCalledTimes(0);
    expect(creditCard).toBeUndefined();
  });
});
