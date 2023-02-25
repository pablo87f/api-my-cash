import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import GetUserWallet from '../wallet/get-user-wallet';

const getUserWalletMock: jest.Mocked<GetUserWallet> = {
  execute: jest.fn(),
  walletsRepository: walletsRepositoryMock,
};

export default getUserWalletMock;
