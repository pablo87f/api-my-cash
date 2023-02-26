import { User } from '../../../domain/entities/user';
import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import fakes from '../__mocks__/_fakes';
import GetCreditCard from './get-credit-card';

const makeSut = () => {
  const sut = new GetCreditCard(creditCardsRepositoryMock);
  return sut;
};

beforeEach(() => {
  creditCardsRepositoryMock.findOne.mockClear();
});

describe('Get credit card', () => {
  it('should get a credit card from an user', async () => {
    // given
    const { pabloUserEmail } = fakes.constants;
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );
    creditCardsRepositoryMock.findOne.mockResolvedValueOnce(
      fakeCreditCardPablo,
    );

    // when
    const sut = makeSut();
    const creditCard: CreditCard = await sut.execute({
      id: fakeCreditCardPablo.id,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeCreditCardPablo.id,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCard).toBeInstanceOf(CreditCard);
    expect(creditCard.user_id).toEqual(fakeCreditCardPablo.user_id);
    expect(creditCard.id).toEqual(fakeCreditCardPablo.id);
  });

  it('should return undefined when dont find the credit card from the specific user', async () => {
    // given
    const { pabloUserEmail, jackUserEmail } = fakes.constants;
    const fakeUserJack: User = fakes.entities.users[jackUserEmail];
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );
    creditCardsRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    const sut = makeSut();

    const creditcard = await sut.execute({
      id: fakeCreditCardPablo.id,
      user_id: fakeUserJack.id,
    });

    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: fakeCreditCardPablo.id,
      user_id: fakeUserJack.id,
    });

    expect(creditcard).toBeUndefined();
  });
});
