import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import PurchasesInMemoryRepository from '../../domain/infra/repositories/InMemory/PurchasesInMemoryRepository';
import Constants from '../../constants';
import { Purchase } from '../../domain/entities/purchase';
import CreateExpenseForPurchase from './expense/create-expense-for-purchase';
import CreatePurchase from './create-purchase';
import CreateExpensesForPurchasePortions from './expense/create-expenses-for-purchase-portions';

describe('Create purchase', () => {
  it('should create a purchase with payed by debit', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();
    const createPurchasePortionsExpenses =
      new CreateExpensesForPurchasePortions(expensesRepository);
    const createPurchaseExpense = new CreateExpenseForPurchase(
      expensesRepository,
    );

    const purchasesRepository = new PurchasesInMemoryRepository();
    const createPurchase = new CreatePurchase(
      purchasesRepository,
      createPurchasePortionsExpenses,
      createPurchaseExpense,
    );

    const purchase: Purchase = await createPurchase.execute({
      name: 'Compra Mateus Supermercados',
      portions: 1,
      total_amount: 350,
      user_id: Constants.fakeUser.id,
      due_date: parseISO('2022-08-10'),
      payment_method: 'DEBIT',
    });

    expect(purchase.expenses.length).toEqual(1);
  });

  it('should create a purchase with payed by credit', async () => {
    const expensesRepository = new ExpensesInMemoryRepository();
    const createPurchasePortionsExpenses =
      new CreateExpensesForPurchasePortions(expensesRepository);
    const createPurchaseExpense = new CreateExpenseForPurchase(
      expensesRepository,
    );

    const purchasesRepository = new PurchasesInMemoryRepository();
    const createPurchase = new CreatePurchase(
      purchasesRepository,
      createPurchasePortionsExpenses,
      createPurchaseExpense,
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
