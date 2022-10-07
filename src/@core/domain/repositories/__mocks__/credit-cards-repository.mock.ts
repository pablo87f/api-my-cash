import { CreditCard } from '../../entities/credit-card';
import ICreditCardsRepository from '../ICreditCardsRepository';

const creditCardsRepositoryMock: jest.Mocked<ICreditCardsRepository> = {
  create: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  retrieve: jest.fn(),
};

export const createCreditCardInMemoryImpl = async (createCreditCardDto) => {
  return new CreditCard({
    ...createCreditCardDto,
  });
};

export const updateCreditCardInMemoryImpl = async (
  credit_card_id,
  updateCreditCardDto,
) => {
  return new CreditCard({
    id: credit_card_id,
    ...updateCreditCardDto,
  });
};

export default creditCardsRepositoryMock;
