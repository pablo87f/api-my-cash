import CreateExpenseForRecurringBill from '../../use-cases/expense/create-expense-for-recurring-bill';
import expensesRepositoryMock from '../repositories/expenses-repository.mock';

const createExpenseForRecurringBillMock: jest.Mocked<CreateExpenseForRecurringBill> =
  {
    execute: jest.fn(),
    expensesRepository: expensesRepositoryMock,
  };

export default createExpenseForRecurringBillMock;
