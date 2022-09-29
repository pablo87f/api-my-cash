import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import expensesRepositoryMock from '../../__mocks__/repositories/expenses-repository.mock';
import CreateExpenseForPurchase from './create-expense-for-purchase';

const makeSut = () => {
  const sut = new CreateExpenseForPurchase(expensesRepositoryMock);
  return sut;
};

describe('Create expense to purchase', () => {
  it('should create a expense', async () => {
    expensesRepositoryMock.createForPurchase.mockResolvedValue(
      new Expense({
        amount: 300,
        due_date: parseISO('2022-08-10'),
        user_id: '1',
        name: 'Compra Mateus Supermercados',
        purchase_id: '1',
      }),
    );

    const sut = makeSut();

    const expense = await sut.execute({
      amount: 300,
      due_date: parseISO('2022-08-10'),
      user_id: '1',
      name: 'Compra Mateus Supermercados',
      purchase_id: '1',
    });

    expect(expensesRepositoryMock.createForPurchase).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.createForPurchase).toHaveBeenCalledWith({
      amount: 300,
      due_date: parseISO('2022-08-10'),
      user_id: '1',
      name: 'Compra Mateus Supermercados',
      purchase_id: '1',
    });

    expect(expense.id).toBeDefined();
    expect(expense.name).toEqual('Compra Mateus Supermercados');
    expect(expense.purchase_id).toEqual('1');
  });
});
