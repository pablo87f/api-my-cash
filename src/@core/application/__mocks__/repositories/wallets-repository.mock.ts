import IWalletsRepository from 'src/@core/domain/repositories/IWalletsRepository';

const walletsRepositoryMock: jest.Mocked<IWalletsRepository> = {
  create: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
};

export default walletsRepositoryMock;
