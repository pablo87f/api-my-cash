import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../domain/infra/repositories/ExpensesInMemoryRepository';
import PurchasesInMemoryRepository from '../../domain/infra/repositories/PurchasesInMemoryRepository';
import Constants from '../../constants';
import { Purchase } from '../../domain/entities/purchase';
import CreatePurchaseExpense from './create-purchase-expense';
import CreatePurchase from './create-purchase';
import CreatePurchasePortionsExpenses from './create-purchase-portions-expenses';
import { RecurringBill } from '../../domain/entities/recurring-bill';
import RecurringBillsInMemoryRepository from '../../domain/infra/repositories/RecurringBillsInMemoryRepository';
import CreateRecurringBill from './create-recurring-bill';
import CreateRecurringBillExpense from './create-recurring-bill-expense';

describe('Create recurring bill', () => {
  it('should create a recurring bill', async () => {
    const recurringBillsRepository = new RecurringBillsInMemoryRepository();
    const expensesInMemoryRepository = new ExpensesInMemoryRepository();
    const createRecurringBillExpense = new CreateRecurringBillExpense(
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
    const createPurchasePortionsExpenses = new CreatePurchasePortionsExpenses(
      expensesRepository,
    );
    const createExpense = new CreatePurchaseExpense(expensesRepository);

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
