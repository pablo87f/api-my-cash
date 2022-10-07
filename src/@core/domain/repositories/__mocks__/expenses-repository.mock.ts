import { Expense } from '../../entities/expense';
import IExpensesRepository from '../IExpensesRepository';

const expensesRepositoryMock: jest.Mocked<IExpensesRepository> = {
  bulkCreateForPurchase: jest.fn(),
  createForPurchase: jest.fn(),
  createToRecurringBill: jest.fn(),
  retrieve: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
};

export const bulkCreateForPurchaseInMemoryImpl = async (
  createExpenseForPurchaseDto,
) => {
  return createExpenseForPurchaseDto.map(
    (expenseDto) =>
      new Expense({
        ...expenseDto,
      }),
  );
};

export const createForPurchaseInMemoryImpl = async (
  createExpenseForPurchaseDto,
) => {
  new Expense({
    ...createExpenseForPurchaseDto,
  });
};

export const createToRecurringBillInMemoryImpl = async (
  createForRecurringBillDto,
) => {
  new Expense({
    ...createForRecurringBillDto,
  });
};

export default expensesRepositoryMock;
