import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsRepositoryMock from '../../../domain/repositories/__mocks__/recurring-bills-repository.mock';
import createExpenseForRecurringBillMock from '../__mocks__/create-expense-for-recurring-bill.mock';
import CreateRecurringBill from './create-recurring-bill';

const makeSut = () => {
  const createPurchase = new CreateRecurringBill(recurringBillsRepositoryMock);

  return createPurchase;
};

describe('Create recurring bill', () => {
  it('should create a recurring bill', async () => {
    const createdRecurringBill = new RecurringBill({
      id: 'recurringbill1',
      name: 'Conta celular',
      estimated_amount: 49,
      user_id: '1',
      due_date: parseISO('2022-08-10'),
    });

    recurringBillsRepositoryMock.create.mockResolvedValue(createdRecurringBill);

    const sut = makeSut();

    const recurringBill: RecurringBill = await sut.execute({
      name: 'Conta celular',
      estimated_amount: 49,
      user_id: '1',
      due_date: parseISO('2022-08-10'),
    });

    expect(recurringBillsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(recurringBillsRepositoryMock.create).toHaveBeenCalledWith({
      name: 'Conta celular',
      estimated_amount: 49,
      user_id: '1',
      due_date: parseISO('2022-08-10'),
    });

    expect(recurringBill.name).toEqual('Conta celular');
    expect(recurringBill.estimated_amount).toEqual(49);
    expect(recurringBill.due_date).toEqual(parseISO('2022-08-10'));
  });
});
