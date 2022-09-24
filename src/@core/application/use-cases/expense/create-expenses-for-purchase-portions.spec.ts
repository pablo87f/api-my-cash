import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import CreateExpensesForPurchasePortions from './create-expenses-for-purchase-portions';

describe('Create expenses for purchase portions', () => {
  it('should create the expenses for the purchase portions', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();

    const createExpensesPurchasePortions =
      new CreateExpensesForPurchasePortions(expensesRepository);

    const expenses = await createExpensesPurchasePortions.execute({
      portions: 3,
      total_amount: 300,
      name: 'Teclado mecânico',
      purchase_id: '1',
      user_id: '1',
      due_date: parseISO('2022-10-08'),
    });

    expect(expenses.length).toEqual(3);
    expect(expenses[0].amount).toEqual(100);
    expect(expenses[0].name).toEqual(`Teclado mecânico - 1/3`);
    expect(expenses[1].name).toEqual(`Teclado mecânico - 2/3`);
    expect(expenses[2].name).toEqual(`Teclado mecânico - 3/3`);

    expect(expenses[0].due_date).toEqual(parseISO('2022-11-08'));
    expect(expenses[1].due_date).toEqual(parseISO('2022-12-08'));
    expect(expenses[2].due_date).toEqual(parseISO('2023-01-08'));
  });
});
