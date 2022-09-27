import CreateExpenseForPurchase from '../../use-cases/expense/create-expense-for-purchase';
import expensesRepositoryMock from '../repositories/expenses-repository.mock';

const createExpenseForPurchaseMock: jest.Mocked<CreateExpenseForPurchase> = {
  execute: jest.fn(),
  expensesRepository: expensesRepositoryMock,
};

export default createExpenseForPurchaseMock;
