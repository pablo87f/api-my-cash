import GetCreditCard from '../credit-card/get-credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';

const getCreditCardMock: jest.Mocked<GetCreditCard> = {
  execute: jest.fn(),
  creditCardsRepository: creditCardsRepositoryMock,
};

export default getCreditCardMock;
