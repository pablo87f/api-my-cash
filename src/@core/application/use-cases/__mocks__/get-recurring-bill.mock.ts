import GetRecurringBill from '../recurring-bill/get-recurring-bill';
import recurringBillsRepositoryMock from '../../../domain/repositories/__mocks__/recurring-bills-repository.mock';

const getRecurringBillMock: jest.Mocked<GetRecurringBill> = {
  execute: jest.fn(),
  recurringBillRepository: recurringBillsRepositoryMock,
};

export default getRecurringBillMock;
