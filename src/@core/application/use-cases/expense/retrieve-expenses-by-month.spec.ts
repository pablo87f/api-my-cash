import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';
import RetriveExpensesByMonth from './retrieve-expenses-by-month';

const makeSut = () => {
  const sut = new RetriveExpensesByMonth(expensesRepositoryMock);
  return sut;
};

describe('List expenses by month', () => {
  it('should retrieve the list of expenses by month', async () => {
    const fakeRetrievedExpenses = [
      new Expense({
        name: 'Compra Supermercado',
        amount: 400,
        due_date: parseISO('2022-10-03'),
        id: 'expense1',
        user_id: 'user1',
        purchase_id: 'purchase1',
      }),
      new Expense({
        name: 'Conta de energia - 10/2022',
        amount: 500,
        due_date: parseISO('2022-10-07'),
        id: 'expense2',
        user_id: 'user1',
        recurring_bill_id: 'recurringbill1',
      }),
      new Expense({
        name: 'Compra cacau Show',
        amount: 30,
        due_date: parseISO('2022-10-03'),
        id: 'expense3',
        user_id: 'user1',
        purchase_id: 'purchase2',
      }),
    ];

    expensesRepositoryMock.retrieve.mockResolvedValueOnce(
      fakeRetrievedExpenses,
    );

    const sut = makeSut();

    const expenses = await sut.execute({
      ref_month: parseISO('2022-10-01'),
      user_id: 'user1',
    });

    expect(expensesRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.retrieve).toHaveBeenCalledWith({
      ref_month: parseISO('2022-10-01'),
      user_id: 'user1',
    });

    expect(expenses).toBeInstanceOf(Array<Expense>);
    expect(expenses.length).toEqual(3);
  });
});
