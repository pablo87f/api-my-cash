import PayWithCreditCard from '../credit-card/pay-with-credit-card';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';

const payWithCreditCardMock: jest.Mocked<PayWithCreditCard> = {
  execute: jest.fn(),
  creditCardsRepository: creditCardsRepositoryMock,
};

export default payWithCreditCardMock;
