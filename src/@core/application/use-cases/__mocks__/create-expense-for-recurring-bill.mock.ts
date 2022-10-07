import CreateExpenseForRecurringBill from '../expense/create-expense-for-recurring-bill';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';

const createExpenseForRecurringBillMock: jest.Mocked<CreateExpenseForRecurringBill> =
  {
    execute: jest.fn(),
    expensesRepository: expensesRepositoryMock,
  };

export default createExpenseForRecurringBillMock;
