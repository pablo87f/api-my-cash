import userAccountsRepositoryMock from '../../../domain/repositories/__mocks__/user-accounts-repository.mock';
import accountsRepositoryMock from '../../../domain/repositories/__mocks__/accounts-repository.mock';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import CreateUser from '../user/create-user';

const createUserMock: jest.Mocked<CreateUser> = {
  execute: jest.fn(),
  accountsRepository: accountsRepositoryMock,
  usersRepository: usersRepositoryMock,
  userAccountsRepository: userAccountsRepositoryMock,
};

export default createUserMock;
