import { parseISO } from 'date-fns';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsFactory from '../../../domain/entities/__mocks__/recurring-bills.factory';
import recurringBillsRepositoryMock from '../../../domain/repositories/__mocks__/recurring-bills-repository.mock';
import RetrieveRecurringBillsbyMonth from './retrieve-recurring-bills-by-month';

const makeSut = () => {
  const sut = new RetrieveRecurringBillsbyMonth(recurringBillsRepositoryMock);
  return sut;
};

describe('Retrieve recurring bills by month', () => {
  it('should retrieve the recurring bills by month', async () => {
    const fakeRecurringBills = recurringBillsFactory.makeMany(2, {
      user_id: 'user1',
      due_date: parseISO('2022-10-05'),
    });

    recurringBillsRepositoryMock.retrieveByMonth.mockResolvedValueOnce(
      fakeRecurringBills,
    );

    const sut = makeSut();

    const recurringBills = await sut.execute({
      user_id: 'user1',
      ref_month: parseISO('2022-10-01'),
    });

    expect(recurringBillsRepositoryMock.retrieveByMonth).toHaveBeenCalledTimes(
      1,
    );
    expect(recurringBillsRepositoryMock.retrieveByMonth).toHaveBeenCalledWith({
      user_id: 'user1',
      ref_month: parseISO('2022-10-01'),
    });

    expect(recurringBills).toBeInstanceOf(Array<RecurringBill>);
    expect(recurringBills.length).toEqual(2);
  });
});
