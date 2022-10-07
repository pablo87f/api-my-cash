import IPurchasesRepository from '../IPurchasesRepository';

const purchasesRepositoryMock: jest.Mocked<IPurchasesRepository> = {
  create: jest.fn(),
  update: jest.fn(),
};

export default purchasesRepositoryMock;
