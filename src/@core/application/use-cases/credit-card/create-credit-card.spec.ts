import { CreditCard } from '../../../domain/entities/credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import fakes from '../__mocks__/_fakes';
import CreateCreditCard from './create-credit-card';

const makeSut = () => {
  const sut = new CreateCreditCard(creditCardsRepositoryMock);
  return sut;
};

beforeEach(() => {
  creditCardsRepositoryMock.findOne.mockClear();
  creditCardsRepositoryMock.create.mockClear();
});

describe('Create credit card', () => {
  it('should create a credit card with a unique name', async () => {
    // given
    const sut = makeSut();

    const { pabloUserEmail } = fakes.constants;
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );

    creditCardsRepositoryMock.findOne.mockResolvedValueOnce(undefined);
    creditCardsRepositoryMock.create.mockResolvedValueOnce(fakeCreditCardPablo);

    // when
    const creditCard = await sut.execute({
      name: fakeCreditCardPablo.name,
      total_limit: fakeCreditCardPablo.total_limit,
      user_id: fakeCreditCardPablo.user_id,
    });

    // then
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      name: fakeCreditCardPablo.name,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCardsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.create).toHaveBeenCalledWith({
      name: fakeCreditCardPablo.name,
      total_limit: fakeCreditCardPablo.total_limit,
      spent_amount: 0,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCard.name).toEqual(fakeCreditCardPablo.name);
    expect(creditCard.total_limit).toEqual(fakeCreditCardPablo.total_limit);
    expect(creditCard.spent_amount).toEqual(0);
  });

  it('should create a credit card with spent amount', async () => {
    // given
    const sut = makeSut();

    const { pabloUserEmail } = fakes.constants;
    const [fakeCreditCardPablo] = fakes.entities.take<CreditCard>(
      'creditCards',
      pabloUserEmail,
      1,
    );
    const fakeSpentAmount = 100;
    const fakeCreatedCreditCard = new CreditCard({
      ...fakeCreditCardPablo.props,
      spent_amount: fakeSpentAmount,
    });

    creditCardsRepositoryMock.findOne.mockResolvedValueOnce(undefined);
    creditCardsRepositoryMock.create.mockResolvedValueOnce(
      fakeCreatedCreditCard,
    );

    // when
    const creditCard = await sut.execute({
      name: fakeCreditCardPablo.name,
      total_limit: fakeCreditCardPablo.total_limit,
      user_id: fakeCreditCardPablo.user_id,
      spent_amount: fakeSpentAmount,
    });

    // then
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      name: fakeCreditCardPablo.name,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCardsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.create).toHaveBeenCalledWith({
      name: fakeCreditCardPablo.name,
      total_limit: fakeCreditCardPablo.total_limit,
      spent_amount: fakeSpentAmount,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCard.name).toEqual(fakeCreditCardPablo.name);
    expect(creditCard.total_limit).toEqual(fakeCreditCardPablo.total_limit);
    expect(creditCard.spent_amount).toEqual(fakeSpentAmount);
  });

  it('should return undefined with already exists a credit card with the same name', async () => {
    // given
    const sut = makeSut();

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
    const creditCard = await sut.execute({
      name: fakeCreditCardPablo.name,
      total_limit: fakeCreditCardPablo.total_limit,
      user_id: fakeCreditCardPablo.user_id,
    });

    // then
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      name: fakeCreditCardPablo.name,
      user_id: fakeCreditCardPablo.user_id,
    });

    expect(creditCardsRepositoryMock.create).toBeCalledTimes(0);

    expect(creditCard).toBeUndefined();
  });
});
