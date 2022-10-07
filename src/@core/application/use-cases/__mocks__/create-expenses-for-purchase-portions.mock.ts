import CreateExpensesForPurchasePortions from '../expense/create-expenses-for-purchase-portions';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';

const createExpensesForPurchasePortionsMock: jest.Mocked<CreateExpensesForPurchasePortions> =
  {
    execute: jest.fn(),
    expensesRepository: expensesRepositoryMock,
  };

export default createExpensesForPurchasePortionsMock;
