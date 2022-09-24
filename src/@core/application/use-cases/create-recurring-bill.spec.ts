import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import PurchasesInMemoryRepository from '../../domain/infra/repositories/InMemory/PurchasesInMemoryRepository';
import Constants from '../../constants';
import { Purchase } from '../../domain/entities/purchase';
import CreateExpenseForPurchase from './expense/create-expense-for-purchase';
import CreatePurchase from './create-purchase';
import CreateExpensesForPurchasePortions from './expense/create-expenses-for-purchase-portions';
import { RecurringBill } from '../../domain/entities/recurring-bill';
import RecurringBillsInMemoryRepository from '../../domain/infra/repositories/InMemory/RecurringBillsInMemoryRepository';
import CreateRecurringBill from './create-recurring-bill';
import CreateExpenseForRecurringBill from './expense/create-expense-for-recurring-bill';

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

  it('should create a purchase with payed by credit', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();
    const createPurchasePortionsExpenses =
      new CreateExpensesForPurchasePortions(expensesRepository);
    const createExpense = new CreateExpenseForPurchase(expensesRepository);

    const purchasesRepository = new PurchasesInMemoryRepository();
    const createPurchase = new CreatePurchase(
      purchasesRepository,
      createPurchasePortionsExpenses,
      createExpense,
    );

    const purchase: Purchase = await createPurchase.execute({
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 350,
      user_id: Constants.fakeUser.id,
      due_date: parseISO('2022-08-10'),
      payment_method: 'CREDIT',
    });

    expect(purchase.expenses.length).toEqual(3);
  });
});
