import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';
import RetrieveCreditCards from './retrieve-expenses';

const makeSut = () => {
  const retrieveCreditCards = new RetrieveCreditCards(expensesRepositoryMock);
  return retrieveCreditCards;
};

describe('Retrieve credit cards', () => {
  it('should retrieve the user credit cards', async () => {
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
        name: 'Conta de energia',
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

    const retrivedExpenses = await sut.execute('user1');

    expect(expensesRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.retrieve).toHaveBeenCalledWith('user1');

    expect(retrivedExpenses).toBeInstanceOf(Array<Expense>);
    expect(retrivedExpenses.length).toEqual(3);
  });
});
