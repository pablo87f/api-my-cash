import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import { Purchase } from '../../../domain/entities/purchase';
import purchasesRepositoryMock from '../../__mocks__/repositories/purchases-repository.mock';
import createExpensesForPurchasePortionsMock from '../../__mocks__/use-cases/create-expenses-for-purchase-portions.mock';
import payWithCreditCardMock from '../../__mocks__/use-cases/pay-with-credit-card.mock';
import CreatePurchaseWithCreditCard from './create-purchase-with-credit-card';

const makeSut = () => {
  const sut = new CreatePurchaseWithCreditCard(
    purchasesRepositoryMock,
    createExpensesForPurchasePortionsMock,
    payWithCreditCardMock,
  );

  return sut;
};

describe('CreatePurchaseWithCreditCard', () => {
  it('should create a purchase payed by credit card', async () => {
    const createdPurchase = new Purchase({
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 300,
      user_id: 'user1',
      due_date: parseISO('2022-08-10'),
      payment_method: 'CREDIT',
      payment_source_id: 'creditcard1',
      id: 'purchase1',
    });

    const createdExpenses = [
      new Expense({
        purchase_id: createdPurchase.id,
        due_date: parseISO('2022-08-10'),
        name: 'Compra Mateus Supermercados - 1/3',
        amount: 100,
        user_id: createdPurchase.user_id,
      }),
      new Expense({
        purchase_id: createdPurchase.id,
        due_date: parseISO('2022-09-10'),
        name: 'Compra Mateus Supermercados - 2/3',
        amount: 100,
        user_id: createdPurchase.user_id,
      }),
      new Expense({
        purchase_id: createdPurchase.id,
        due_date: parseISO('2022-10-10'),
        name: 'Compra Mateus Supermercados - 3/3',
        amount: 100,
        user_id: createdPurchase.user_id,
      }),
    ];

    const updatePurchase = new Purchase({
      ...createdPurchase.props,
      expenses: createdExpenses,
    });

    purchasesRepositoryMock.create.mockResolvedValueOnce(createdPurchase);

    createExpensesForPurchasePortionsMock.execute.mockResolvedValueOnce(
      createdExpenses,
    );

    purchasesRepositoryMock.update.mockResolvedValueOnce(updatePurchase);

    const sut = makeSut();

    // when
    const purchase: Purchase = await sut.execute({
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 300,
      user_id: 'user1',
      due_date: parseISO('2022-08-10'),
      credit_card_id: 'creditcard1',
    });

    // then
    expect(purchasesRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.create).toHaveBeenCalledWith({
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      payment_method: 'CREDIT',
      portions: 3,
      total_amount: 300,
      user_id: 'user1',
      payment_source_id: 'creditcard1',
    });

    expect(createExpensesForPurchasePortionsMock.execute).toHaveBeenCalledTimes(
      1,
    );
    expect(createExpensesForPurchasePortionsMock.execute).toHaveBeenCalledWith({
      purchase_id: 'purchase1',
      due_date: parseISO('2022-08-10'),
      name: 'Compra Mateus Supermercados',
      portions: 3,
      total_amount: 300,
      user_id: 'user1',
    });

    expect(payWithCreditCardMock.execute).toHaveBeenCalledTimes(1);
    expect(payWithCreditCardMock.execute).toHaveBeenCalledWith({
      user_id: 'user1',
      credit_card_id: 'creditcard1',
      value_to_pay: 300,
    });

    expect(purchasesRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.update).toHaveBeenCalledWith('purchase1', {
      ...createdPurchase.props,
      expenses: createdExpenses,
    });

    expect(purchase.expenses.length).toEqual(3);
    expect(purchase.total_amount).toEqual(300);
    expect(purchase.user_id).toEqual('user1');
    expect(purchase.due_date).toEqual(parseISO('2022-08-10'));
    expect(purchase.payment_method).toEqual('CREDIT');
    expect(purchase.payment_source_id).toEqual('creditcard1');
  });
});
