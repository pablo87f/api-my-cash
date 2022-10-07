import CreateExpenseForPurchase from '../expense/create-expense-for-purchase';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';

const createExpenseForPurchaseMock: jest.Mocked<CreateExpenseForPurchase> = {
  execute: jest.fn(),
  expensesRepository: expensesRepositoryMock,
};

export default createExpenseForPurchaseMock;
