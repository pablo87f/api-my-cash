import IUsersRepository from '../IUsersRepository';

const usersRepositoryMock: jest.Mocked<IUsersRepository> = {
  create: jest.fn(),
  findOne: jest.fn(),
};

export default usersRepositoryMock;
