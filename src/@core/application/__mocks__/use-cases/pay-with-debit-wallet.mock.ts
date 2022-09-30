import PayWithDebitWallet from '../../use-cases/wallet/pay-with-debit-wallet';
import walletsRepositoryMock from '../repositories/wallets-repository.mock';

const payWithDebitWalletMock: jest.Mocked<PayWithDebitWallet> = {
  execute: jest.fn(),
  walletsRepository: walletsRepositoryMock,
};

export default payWithDebitWalletMock;
