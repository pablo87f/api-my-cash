import IRecurringBillsRepository from '../IRecurringBillsRepository';

const recurringBillsRepositoryMock: jest.Mocked<IRecurringBillsRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  retrieveByUser: jest.fn(),
};

export default recurringBillsRepositoryMock;
