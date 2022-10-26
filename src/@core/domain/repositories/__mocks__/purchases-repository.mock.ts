import IPurchasesRepository from '../IPurchasesRepository';

const purchasesRepositoryMock: jest.Mocked<IPurchasesRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  retrieve: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

export default purchasesRepositoryMock;
