import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import CreateExpenseForPurchase from './create-expense-for-purchase';

describe('Create expense to purchase', () => {
  it('should create a expense', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();
    const createExpense = new CreateExpenseForPurchase(expensesRepository);

    const expense = await createExpense.execute({
      amount: 300,
      due_date: parseISO('2022-08-10'),
      user_id: '1',
      name: 'Compra Mateus Supermercados',
      purchase_id: '1',
    });

    expect(expense.id).toBeDefined();
    expect(expense.name).toEqual('Compra Mateus Supermercados');
    expect(expense.due_date).toEqual(parseISO('2022-08-10'));
  });
});
