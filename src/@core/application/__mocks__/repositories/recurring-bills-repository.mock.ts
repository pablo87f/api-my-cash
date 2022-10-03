import IRecurringBillsRepository from 'src/@core/domain/repositories/IRecurringBillsRepository';

const recurringBillsRepositoryMock: jest.Mocked<IRecurringBillsRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
};

export default recurringBillsRepositoryMock;
