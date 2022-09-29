import { parseISO } from 'date-fns';
import expensesRepositoryMock, {
  bulkCreateForPurchaseInMemoryImpl,
} from '../../__mocks__/repositories/expenses-repository.mock';
import CreateExpensesForPurchasePortions from './create-expenses-for-purchase-portions';

const makeSut = () => {
  const sut = new CreateExpensesForPurchasePortions(expensesRepositoryMock);
  return sut;
};

describe('Create expenses for purchase portions', () => {
  it('should create the expenses for the purchase portions', async () => {
    expensesRepositoryMock.bulkCreateForPurchase.mockImplementation(
      bulkCreateForPurchaseInMemoryImpl,
    );

    const sut = makeSut();

    const expenses = await sut.execute({
      portions: 3,
      total_amount: 300,
      name: 'Teclado mecânico',
      purchase_id: 'purchase1',
      user_id: 'user1',
      due_date: parseISO('2022-10-08'),
    });

    expect(expensesRepositoryMock.bulkCreateForPurchase).toHaveBeenCalledTimes(
      1,
    );

    expect(expensesRepositoryMock.bulkCreateForPurchase).toHaveBeenCalledWith([
      {
        amount: 100,
        due_date: parseISO('2022-11-08'),
        name: 'Teclado mecânico - 1/3',
        purchase_id: 'purchase1',
        user_id: 'user1',
      },
      {
        amount: 100,
        due_date: parseISO('2022-12-08'),
        name: 'Teclado mecânico - 2/3',
        purchase_id: 'purchase1',
        user_id: 'user1',
      },
      {
        amount: 100,
        due_date: parseISO('2023-01-08'),
        name: 'Teclado mecânico - 3/3',
        purchase_id: 'purchase1',
        user_id: 'user1',
      },
    ]);

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
