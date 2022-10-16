import { parseISO } from 'date-fns';
import { RecurringBill } from '../../../domain/entities/recurring-bill';
import recurringBillsFactory from '../../../domain/entities/__mocks__/recurring-bills.factory';
import recurringBillsRepositoryMock from '../../../domain/repositories/__mocks__/recurring-bills-repository.mock';
import RetrieveRecurringBillsByUser from './retrieve-recurring-bills-by-user';

const makeSut = () => {
  const sut = new RetrieveRecurringBillsByUser(recurringBillsRepositoryMock);
  return sut;
};

describe('Retrieve recurring bills by user', () => {
  it('should retrieve the recurring bills by user', async () => {
    const fakeRecurringBills = recurringBillsFactory.makeMany(2, {
      user_id: 'user1',
      due_date: parseISO('2022-10-05'),
    });

    recurringBillsRepositoryMock.retrieveByUser.mockResolvedValueOnce(
      fakeRecurringBills,
    );

    const sut = makeSut();

    const recurringBills = await sut.execute({
      user_id: 'user1',
    });

    expect(recurringBillsRepositoryMock.retrieveByUser).toHaveBeenCalledTimes(
      1,
    );
    expect(recurringBillsRepositoryMock.retrieveByUser).toHaveBeenCalledWith(
      'user1',
    );

    expect(recurringBills).toBeInstanceOf(Array<RecurringBill>);
    expect(recurringBills.length).toEqual(2);
  });
});
