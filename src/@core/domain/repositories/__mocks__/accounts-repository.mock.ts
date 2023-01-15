import IAccountsRepository from '../IAccountsRepository';

const accountsRepositoryMock: jest.Mocked<IAccountsRepository> = {
  create: jest.fn(),
  findOne: jest.fn(),
};

export default accountsRepositoryMock;
