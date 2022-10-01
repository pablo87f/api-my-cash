import GetCreditCard from '../../use-cases/credit-card/get-credit-card';
import creditCardsRepositoryMock from '../repositories/credit-cards-repository.mock';

const getCreditCardMock: jest.Mocked<GetCreditCard> = {
  execute: jest.fn(),
  creditCardsRepository: creditCardsRepositoryMock,
};

export default getCreditCardMock;
