import { parseISO } from 'date-fns';
import { Purchase } from '../../../domain/entities/purchase';
import creditCardsRepositoryMock from '../../__mocks__/repositories/credit-cards-repository.mock';
// import walletsRepositoryMock from '../__mocks__/wallets-repository-mock';
import { Expense } from '../../../domain/entities/expense';
import purchasesRepositoryMock from '../../__mocks__/repositories/purchases-repository.mock';
import createExpenseForPurchaseMock from '../../__mocks__/use-cases/create-expense-for-purchase.mock';
import payWithDebitWalletMock from '../../__mocks__/use-cases/pay-with-debit-wallet.mock';
import CreatePurchaseWithDebitWallet from './create-purchase-with-debit-wallet';

beforeEach(() => {
  creditCardsRepositoryMock.get.mockClear();
});

const makeSut = () => {
  const createPurchase = new CreatePurchaseWithDebitWallet(
    purchasesRepositoryMock,
    createExpenseForPurchaseMock,
    payWithDebitWalletMock,
  );

  return createPurchase;
};

describe('Create purchase with debit wallet', () => {
  it('should create a purchase payed by debit', async () => {
    const createdPurchase = new Purchase({
      name: 'Compra Mateus Supermercados',
      total_amount: 300,
      user_id: 'user1',
      due_date: parseISO('2022-08-10'),
      payment_method: 'DEBIT',
      payment_source_id: 'wallet1',
      id: 'purchase1',
    });

    const createdExpense = new Expense({
      purchase_id: createdPurchase.id,
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      amount: 300,
      user_id: createdPurchase.user_id,
    });

    const updatedPurchase = new Purchase({
      ...createdPurchase.props,
      expenses: [createdExpense],
    });

    purchasesRepositoryMock.create.mockResolvedValueOnce(createdPurchase);

    createExpenseForPurchaseMock.execute.mockResolvedValueOnce(createdExpense);

    purchasesRepositoryMock.update.mockResolvedValueOnce(updatedPurchase);

    const sut = makeSut();

    const purchase: Purchase = await sut.execute({
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 300,
      user_id: 'user1',
      due_date: parseISO('2022-08-10'),
      wallet_id: 'wallet1',
    });

    expect(purchasesRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.create).toHaveBeenCalledWith({
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      payment_method: 'DEBIT',
      total_amount: 300,
      user_id: 'user1',
      payment_source_id: 'wallet1',
    });

    expect(createExpenseForPurchaseMock.execute).toHaveBeenCalledTimes(1);
    expect(createExpenseForPurchaseMock.execute).toHaveBeenCalledWith({
      name: 'Compra Mateus Supermercados',
      user_id: 'user1',
      amount: 300,
      due_date: parseISO('2022-08-10'),
      purchase_id: 'purchase1',
    });

    expect(purchasesRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.update).toHaveBeenCalledWith('purchase1', {
      ...createdPurchase.props,
      expenses: [createdExpense],
    });

    expect(payWithDebitWalletMock.execute).toHaveBeenCalledTimes(1);
    expect(payWithDebitWalletMock.execute).toHaveBeenCalledWith({
      user_id: 'user1',
      wallet_id: 'wallet1',
      value_to_pay: 300,
    });

    expect(purchase.expenses.length).toEqual(1);
    expect(purchase.total_amount).toEqual(300);
    expect(purchase.user_id).toEqual('user1');
    expect(purchase.due_date).toEqual(parseISO('2022-08-10'));
    expect(purchase.payment_method).toEqual('DEBIT');
    expect(purchase.payment_source_id).toEqual('wallet1');
  });
});
