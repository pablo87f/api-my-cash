import GetRecurringBill from '../../use-cases/recurring-bill/get-recurring-bill';
import recurringBillsRepositoryMock from '../repositories/recurring-bills-repository.mock';

const getRecurringBillMock: jest.Mocked<GetRecurringBill> = {
  execute: jest.fn(),
  recurringBillRepository: recurringBillsRepositoryMock,
};

export default getRecurringBillMock;
