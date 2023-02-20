import { parseISO } from 'date-fns';
import Constants from '../../constants';
import { Expense } from './expense';

describe('Expense', () => {
  it('should create expense without pass an id', () => {
    const expense = new Expense({
      name: 'Compra supermercado',
      amount: 100,
      due_date: parseISO('2022-08-01'),
      user_id: Constants.fakeUser.id,
    });

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toBeDefined();
    expect(expense.name).toEqual('Compra supermercado');
    expect(expense.amount).toEqual(100);
    expect(expense.due_date).toEqual(parseISO('2022-08-01'));
    expect(expense.user_id).toEqual(Constants.fakeUser.id);
  });

  it('should create expense passing an id', () => {
    const expense = new Expense({
      id: '1',
      name: 'Compra supermercado',
      amount: 100,
      due_date: parseISO('2022-08-01'),
      user_id: Constants.fakeUser.id,
    });

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toEqual('1');
    expect(expense.name).toEqual('Compra supermercado');
    expect(expense.amount).toEqual(100);
    expect(expense.due_date).toEqual(parseISO('2022-08-01'));
    expect(expense.user_id).toEqual(Constants.fakeUser.id);
  });

  it('should create expense passing an account_id', () => {
    const expense = new Expense({
      id: '1',
      name: 'Compra supermercado',
      amount: 100,
      due_date: parseISO('2022-08-01'),
      user_id: 'user1',
      account_id: 'account1',
    });

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toEqual('1');
    expect(expense.name).toEqual('Compra supermercado');
    expect(expense.amount).toEqual(100);
    expect(expense.due_date).toEqual(parseISO('2022-08-01'));
    expect(expense.user_id).toEqual('user1');
    expect(expense.account_id).toEqual('account1');
  });
});
