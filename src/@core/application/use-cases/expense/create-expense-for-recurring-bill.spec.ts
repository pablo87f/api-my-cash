import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';
import CreateExpenseForRecurringBill from './create-expense-for-recurring-bill';

const makeSut = () => {
  const sut = new CreateExpenseForRecurringBill(expensesRepositoryMock);
  return sut;
};

describe('Create recurring bill expense', () => {
  it('should create a expense', async () => {
    expensesRepositoryMock.createToRecurringBill.mockResolvedValue(
      new Expense({
        due_date: parseISO('2022-08-10'),
        name: 'Compra Mateus Supermercados',
        amount: 300,
        recurring_bill_id: '1',
        user_id: '1',
      }),
    );

    const sut = makeSut();

    const expense = await sut.execute({
      amount: 300,
      due_date: parseISO('2022-08-10'),
      user_id: '1',
      name: 'Compra Mateus Supermercados',
      recurring_bill_id: '1',
    });

    expect(expensesRepositoryMock.createToRecurringBill).toHaveBeenCalledTimes(
      1,
    );
    expect(expensesRepositoryMock.createToRecurringBill).toHaveBeenCalledWith({
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      amount: 300,
      recurring_bill_id: '1',
      user_id: '1',
    });

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toBeDefined();
    expect(expense.recurring_bill_id).toEqual('1');
  });
});
