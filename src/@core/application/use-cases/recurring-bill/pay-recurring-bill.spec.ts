import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsRepositoryMock from '../../__mocks__/repositories/recurring-bills-repository.mock';
import createExpenseForRecurringBillMock from '../../__mocks__/use-cases/create-expense-for-recurring-bill.mock';
import getRecurringBillMock from '../../__mocks__/use-cases/get-recurring-bill.mock';
import payWithDebitWalletMock from '../../__mocks__/use-cases/pay-with-debit-wallet.mock';
import PayRecurringBill from './pay-recurring-bill';

const makeSut = () => {
  const sut = new PayRecurringBill(
    getRecurringBillMock,
    createExpenseForRecurringBillMock,
    recurringBillsRepositoryMock,
    payWithDebitWalletMock,
  );
  return sut;
};

describe('Pay recurring bill', () => {
  it('should pay a recurring bill for a specific month', async () => {
    const fakeRecurrinBill = new RecurringBill({
      due_date: parseISO('2022-10-01'),
      estimated_amount: 400,
      name: 'Conta de energia',
      id: 'recurringbill1',
      expenses: [
        new Expense({
          amount: 400,
          due_date: parseISO('2022-09-01'),
          name: 'Conta de energia - 09/2022',
          id: 'expense0',
          recurring_bill_id: 'recurringbill1',
          user_id: 'user1',
        }),
      ],
      user_id: 'user1',
    });

    const fakeExpense = new Expense({
      amount: 500,
      due_date: parseISO('2022-10-01'),
      name: 'Conta de energia - 10/2022',
      id: 'expense1',
      recurring_bill_id: 'recurringbill1',
      user_id: 'user1',
    });

    getRecurringBillMock.execute.mockResolvedValueOnce(fakeRecurrinBill);

    createExpenseForRecurringBillMock.execute.mockResolvedValueOnce(
      fakeExpense,
    );

    recurringBillsRepositoryMock.update.mockResolvedValueOnce(
      new RecurringBill({
        ...fakeRecurrinBill.props,
        expenses: [...fakeRecurrinBill.expenses, fakeExpense],
        estimated_amount: 450,
      }),
    );

    const sut = makeSut();

    const payedRecurringBill = await sut.execute('recurringbill1', 'user1', {
      real_amount: 500,
      wallet_id: 'wallet1',
      refDate: parseISO('2022-10-01'),
    });

    expect(getRecurringBillMock.execute).toHaveBeenCalledTimes(1);
    expect(getRecurringBillMock.execute).toHaveBeenCalledWith({
      id: 'recurringbill1',
      user_id: 'user1',
    });

    expect(createExpenseForRecurringBillMock.execute).toHaveBeenCalledTimes(1);
    expect(createExpenseForRecurringBillMock.execute).toHaveBeenCalledWith({
      amount: 500,
      due_date: parseISO('2022-10-01'),
      name: 'Conta de energia - 10/2022',
      recurring_bill_id: 'recurringbill1',
      user_id: 'user1',
    });

    expect(recurringBillsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(recurringBillsRepositoryMock.update).toHaveBeenCalledWith(
      'recurringbill1',
      {
        ...fakeRecurrinBill.props,
        estimated_amount: 450,
      },
    );

    expect(payedRecurringBill).toBeInstanceOf(RecurringBill);
  });
});
