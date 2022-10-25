import IPurchasesRepository from '../IPurchasesRepository';

const purchasesRepositoryMock: jest.Mocked<IPurchasesRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  retrieve: jest.fn(),
};

export default purchasesRepositoryMock;
