import { Expense } from '../../../domain/entities/expense';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';
import fakes from '../__mocks__/_fakes';
import RetrieveExpensesByDateRange from './retrieve-expenses-by-month';

const makeSut = () => {
  const sut = new RetrieveExpensesByDateRange(expensesRepositoryMock);
  return sut;
};

beforeEach(() => {
  expensesRepositoryMock.findManyByDateRange.mockClear();
});

describe('List expenses by month', () => {
  it('should retrieve the list of expenses by month', async () => {
    const emailKey = fakes.constants.fakeUserEmailKey;
    const fakeRetrievedExpenses =
      fakes.entities.expenses.sameMonthYear_2022_10[emailKey];

    expensesRepositoryMock.findManyByDateRange.mockResolvedValueOnce(
      fakeRetrievedExpenses,
    );

    const sut = makeSut();

    const expenses = await sut.execute({
      year_month: '2022-10',
      user_id: 'user1',
    });

    expect(expensesRepositoryMock.findManyByDateRange).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.findManyByDateRange).toHaveBeenCalledWith({
      user_id: 'user1',
      start_date: new Date('2022-10-01'),
      end_date: new Date('2022-10-31'),
    });

    expect(expenses).toBeInstanceOf(Array<Expense>);
    expect(expenses.length).toEqual(3);
  });

  it('should retrieve the list of users and account expenses by month', async () => {
    const emailKey = fakes.constants.fakeUserEmailKey;
    const fakeRetrievedExpenses: Expense[] =
      fakes.entities.expenses.all[emailKey];

    expensesRepositoryMock.findManyByDateRange.mockResolvedValueOnce(
      fakeRetrievedExpenses,
    );

    const sut = makeSut();

    const expenses = await sut.execute({
      year_month: '2022-10',
      user_id: 'user1',
      account_id: 'account1',
    });

    expect(expensesRepositoryMock.findManyByDateRange).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.findManyByDateRange).toHaveBeenCalledWith({
      user_id: 'user1',
      account_id: 'account1',
      start_date: new Date('2022-10-01'),
      end_date: new Date('2022-10-31'),
    });

    expect(expenses).toBeInstanceOf(Array<Expense>);
    expect(expenses.length).toEqual(fakeRetrievedExpenses.length);
  });
});
