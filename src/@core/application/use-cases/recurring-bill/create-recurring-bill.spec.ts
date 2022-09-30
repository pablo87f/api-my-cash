import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsRepositoryMock from '../../__mocks__/repositories/recurring-bills-repository.mock';
import createExpenseForRecurringBillMock from '../../__mocks__/use-cases/create-expense-for-recurring-bill.mock';
import CreateRecurringBill from './create-recurring-bill';

const makeSut = () => {
  const createPurchase = new CreateRecurringBill(
    recurringBillsRepositoryMock,
    createExpenseForRecurringBillMock,
  );

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

    const createdExpense = new Expense({
      amount: 49,
      name: 'Conta celular',
      user_id: '1',
      due_date: parseISO('2022-08-10'),
      recurring_bill_id: 'recurringbill1',
    });

    const updatedRecurringBill = new RecurringBill({
      ...createdRecurringBill.props,
      expenses: [createdExpense],
    });

    recurringBillsRepositoryMock.create.mockResolvedValue(createdRecurringBill);

    createExpenseForRecurringBillMock.execute.mockResolvedValue(createdExpense);

    recurringBillsRepositoryMock.update.mockResolvedValue(updatedRecurringBill);

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

    expect(createExpenseForRecurringBillMock.execute).toHaveBeenCalledTimes(1);
    expect(createExpenseForRecurringBillMock.execute).toHaveBeenCalledWith({
      amount: 49,
      name: 'Conta celular',
      user_id: '1',
      due_date: parseISO('2022-08-10'),
      recurring_bill_id: 'recurringbill1',
    });

    expect(recurringBillsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(recurringBillsRepositoryMock.update).toHaveBeenCalledWith(
      'recurringbill1',
      {
        ...createdRecurringBill.props,
        expenses: [createdExpense],
      },
    );

    expect(recurringBill.name).toEqual('Conta celular');
    expect(recurringBill.estimated_amount).toEqual(49);
    expect(recurringBill.due_date).toEqual(parseISO('2022-08-10'));
    expect(recurringBill.expenses.length).toEqual(1);
    expect(recurringBill.expenses[0].recurring_bill_id).toEqual(
      'recurringbill1',
    );
  });
});
