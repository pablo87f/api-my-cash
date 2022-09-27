import CreateExpensesForPurchasePortions from '../../use-cases/expense/create-expenses-for-purchase-portions';
import expensesRepositoryMock from '../repositories/expenses-repository.mock';

const createExpensesForPurchasePortionsMock: jest.Mocked<CreateExpensesForPurchasePortions> =
  {
    execute: jest.fn(),
    expensesRepository: expensesRepositoryMock,
  };

export default createExpensesForPurchasePortionsMock;
