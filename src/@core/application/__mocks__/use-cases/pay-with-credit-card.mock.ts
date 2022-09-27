import PayWithCreditCard from '../../use-cases/credit-card/pay-with-credit-card';
import creditCardsRepositoryMock from '../repositories/credit-cards-repository.mock';

const payWithCreditCardMock: jest.Mocked<PayWithCreditCard> = {
  execute: jest.fn(),
  creditCardsRepository: creditCardsRepositoryMock,
};

export default payWithCreditCardMock;
