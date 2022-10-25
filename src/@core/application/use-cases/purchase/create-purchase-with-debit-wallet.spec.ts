import { parseISO } from 'date-fns';
import { Purchase } from '../../../domain/entities/purchase';
import { Expense } from '../../../domain/entities/expense';
import purchasesRepositoryMock from '../../../domain/repositories/__mocks__/purchases-repository.mock';
import createExpenseForPurchaseMock from '../__mocks__/create-expense-for-purchase.mock';
import payWithDebitWalletMock from '../__mocks__/pay-with-debit-wallet.mock';
import CreatePurchaseWithDebitWallet from './create-purchase-with-debit-wallet';
import expensesRepositoryMock from '../../../domain/repositories/__mocks__/expenses-repository.mock';

const makeSut = () => {
  const createPurchase = new CreatePurchaseWithDebitWallet(
    purchasesRepositoryMock,
    expensesRepositoryMock,
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
      wallet_id: 'wallet1',
      id: 'purchase1',
    });

    const createdExpense = new Expense({
      purchase_id: createdPurchase.id,
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      amount: 300,
      user_id: createdPurchase.user_id,
      paid_at: parseISO('2022-08-10'),
      wallet_id: 'wallet1',
    });

    purchasesRepositoryMock.create.mockResolvedValueOnce(createdPurchase);

    expensesRepositoryMock.create.mockResolvedValueOnce(createdExpense);

    const sut = makeSut();

    const purchase: Purchase = await sut.execute({
      name: 'Compra Mateus Supermercados',
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
      wallet_id: 'wallet1',
    });

    expect(expensesRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(expensesRepositoryMock.create).toHaveBeenCalledWith({
      name: 'Compra Mateus Supermercados',
      user_id: 'user1',
      amount: 300,
      due_date: parseISO('2022-08-10'),
      purchase_id: 'purchase1',
      wallet_id: 'wallet1',
    });

    expect(payWithDebitWalletMock.execute).toHaveBeenCalledTimes(1);
    expect(payWithDebitWalletMock.execute).toHaveBeenCalledWith({
      user_id: 'user1',
      wallet_id: 'wallet1',
      value_to_pay: 300,
    });

    expect(purchase).toBeDefined();
    expect(purchase).toBeInstanceOf(Purchase);
  });
});
