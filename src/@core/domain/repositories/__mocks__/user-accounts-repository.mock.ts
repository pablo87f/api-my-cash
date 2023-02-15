import IUserAccountsRepository from '../IUserAccountsRepository';

const userAccountsRepositoryMock: jest.Mocked<IUserAccountsRepository> = {
  assign: jest.fn(),
};

export default userAccountsRepositoryMock;
