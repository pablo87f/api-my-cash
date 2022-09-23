import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import CreateExpenseForRecurringBill from './create-expense-for-recurring-bill';

describe('Create recurring bill expense', () => {
  it('should create a expense', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();
    const createExpenseForRecurringBill = new CreateExpenseForRecurringBill(
      expensesRepository,
    );

    const expense = await createExpenseForRecurringBill.execute({
      amount: 300,
      due_date: parseISO('2022-08-10'),
      user_id: '1',
      name: 'Compra Mateus Supermercados',
      recurring_bill_id: '1',
    });

    expect(expense.id).toBeDefined();
    expect(expense.name).toEqual('Compra Mateus Supermercados');
    expect(expense.due_date).toEqual(parseISO('2022-08-10'));
    expect(expense.recurring_bill_id).toEqual('1');
  });
});
