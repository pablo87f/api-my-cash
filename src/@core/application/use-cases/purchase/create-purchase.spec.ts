import { parseISO } from 'date-fns';
import ExpensesInMemoryRepository from '../../../domain/infra/repositories/InMemory/ExpensesInMemoryRepository';
import PurchasesInMemoryRepository from '../../../domain/infra/repositories/InMemory/PurchasesInMemoryRepository';
import Constants from '../../../constants';
import { Purchase } from '../../../domain/entities/purchase';
import CreateExpenseForPurchase from '../expense/create-expense-for-purchase';
import CreatePurchase from './create-purchase';
import CreateExpensesForPurchasePortions from '../expense/create-expenses-for-purchase-portions';
import creditCardsRepositoryMock from '../../__mocks__/repositories/credit-cards-repository.mock';
import { CreditCard } from '../../../domain/entities/credit-card';
// import walletsRepositoryMock from '../__mocks__/wallets-repository-mock';
import { Wallet } from '../../../domain/entities/wallet';

beforeEach(() => {
  creditCardsRepositoryMock.get.mockClear();
});

const makeSut = () => {
  // given
  // walletsRepositoryMock.get.mockResolvedValue(
  //   new Wallet({
  //     id: 'wallet1',
  //     name: 'NuConta',
  //     amount: 1000,
  //     active: true,
  //     user_id: 'user1',
  //   }),
  // );

  // const debitWalletAmount = DecrieseWalletAmount();
  const expensesRepository = new ExpensesInMemoryRepository();
  const createPurchasePortionsExpenses = new CreateExpensesForPurchasePortions(
    expensesRepository,
  );
  const createPurchaseExpense = new CreateExpenseForPurchase(
    expensesRepository,
  );

  const purchasesRepository = new PurchasesInMemoryRepository();
  const createPurchase = new CreatePurchase(
    purchasesRepository,
    createPurchasePortionsExpenses,
    createPurchaseExpense,
  );
  return createPurchase;
};

describe('Create purchase', () => {
  it('should create a purchase payed by debit', async () => {
    const sut = makeSut();

    // when
    const purchase: Purchase = await sut.execute({
      name: 'Compra Mateus Supermercados',
      portions: 1,
      total_amount: 350,
      user_id: Constants.fakeUser.id,
      due_date: parseISO('2022-08-10'),
      payment_method: 'DEBIT',
      payment_source_id: 'wallet1',
    });

    // then
    expect(purchase.expenses.length).toEqual(1);
    expect(purchase.portions).toEqual(1);
    expect(purchase.name).toEqual('Compra Mateus Supermercados');
    expect(purchase.total_amount).toEqual(350);
    expect(purchase.due_date).toEqual(parseISO('2022-08-10'));
    expect(purchase.payment_method).toEqual('DEBIT');
    expect(purchase.payment_source_id).toEqual('wallet1');
  });

  it('should create a purchase payed by credit', async () => {
    creditCardsRepositoryMock.get.mockResolvedValue(
      new CreditCard({
        name: 'Cartão Nubank',
        total_limit: 1000,
        user_id: 'user1',
        id: 'creditcard1',
      }),
    );

    const sut = makeSut();
    const purchase: Purchase = await sut.execute({
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 350,
      user_id: Constants.fakeUser.id,
      due_date: parseISO('2022-08-10'),
      payment_method: 'CREDIT',
      payment_source_id: 'creditcard1',
    });

    expect(purchase.expenses.length).toEqual(3);
  });
});
