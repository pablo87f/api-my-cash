import PayWithDebitWallet from '../wallet/pay-with-debit-wallet';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';

const payWithDebitWalletMock: jest.Mocked<PayWithDebitWallet> = {
  execute: jest.fn(),
  walletsRepository: walletsRepositoryMock,
};

export default payWithDebitWalletMock;
