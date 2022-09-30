import { parseISO } from 'date-fns';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import ExpensesInMemoryRepository from '../../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import RecurringBillsInMemoryRepository from '../../../domain/infra/repositories/InMemory/RecurringBillsInMemoryRepository';
import CreateExpenseForRecurringBill from '../expense/create-expense-for-recurring-bill';
import CreateRecurringBill from './create-recurring-bill';

describe('Create recurring bill', () => {
  it('should create a recurring bill', async () => {
    const recurringBillsRepository = new RecurringBillsInMemoryRepository();
    const expensesInMemoryRepository = new ExpensesInMemoryRepository();
    const createRecurringBillExpense = new CreateExpenseForRecurringBill(
      expensesInMemoryRepository,
    );
    const createRecurringBill = new CreateRecurringBill(
      recurringBillsRepository,
      createRecurringBillExpense,
    );

    const recurringBill: RecurringBill = await createRecurringBill.execute({
      name: 'Conta celular',
      estimated_amount: 49,
      user_id: '1',
      due_date: parseISO('2022-08-10'),
    });

    expect(recurringBill.name).toEqual('Conta celular');
    expect(recurringBill.estimated_amount).toEqual(49);
    expect(recurringBill.due_date).toEqual(parseISO('2022-08-10'));
    expect(recurringBill.expenses.length).toEqual(1);
  });
});
