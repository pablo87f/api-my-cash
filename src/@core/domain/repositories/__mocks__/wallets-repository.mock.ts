import IWalletsRepository from '../IWalletsRepository';

const walletsRepositoryMock: jest.Mocked<IWalletsRepository> = {
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
};

export default walletsRepositoryMock;
