import { parseISO } from 'date-fns';
import { Expense } from '../../../domain/entities/expense';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsRepositoryMock from '../../../domain/repositories/__mocks__/recurring-bills-repository.mock';
import GetRecurringBill from './get-recurring-bill';

const makeSut = () => {
  const sut = new GetRecurringBill(recurringBillsRepositoryMock);
  return sut;
};

beforeEach(() => {
  recurringBillsRepositoryMock.get.mockClear();
});

describe('Get recurring bill', () => {
  it('should get a recurring bill by id', async () => {
    recurringBillsRepositoryMock.get.mockResolvedValueOnce(
      new RecurringBill({
        id: 'recurringbill1',
        name: 'Conta de energia',
        estimated_amount: 400,
        active: true,
        user_id: 'user1',
        due_date: parseISO('2022-10-07'),
        expenses: [
          new Expense({
            amount: 400,
            name: 'Conta de energia',
            due_date: parseISO('2022-10-07'),
            id: 'expense1',
            recurring_bill_id: 'recurringbill1',
            user_id: 'user1',
          }),
        ],
      }),
    );

    const sut = makeSut();

    const recurringBill: RecurringBill = await sut.execute({
      id: 'recurringbill1',
      user_id: 'user1',
    });

    expect(recurringBillsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(recurringBillsRepositoryMock.get).toHaveBeenCalledWith(
      'recurringbill1',
      'user1',
    );
    expect(recurringBill).toBeInstanceOf(RecurringBill);
    expect(recurringBill.user_id).toEqual('user1');
    expect(recurringBill.id).toEqual('recurringbill1');
  });

  it('should throw an error when dont find the recurring bill', async () => {
    recurringBillsRepositoryMock.get.mockResolvedValueOnce(undefined);

    const sut = makeSut();
    const recurringBill = await sut.execute({
      id: 'recurringbill1',
      user_id: 'user2',
    });

    expect(recurringBillsRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(recurringBillsRepositoryMock.get).toHaveBeenCalledWith(
      'recurringbill1',
      'user2',
    );
    expect(recurringBill).toBeUndefined();
  });
});
