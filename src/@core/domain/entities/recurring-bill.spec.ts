import { parseISO } from 'date-fns';
import { RecurringBill } from './recurring-bill';

describe('Recurring bill', () => {
  it('should be defined', () => {
    const recurringBill = new RecurringBill({
      id: '1',
      name: 'Internet banda larga',
      estimated_amount: 199,
      due_date: parseISO('2022-08-10'),
      active: true,
      user_id: '1',
    });

    expect(recurringBill).toBeInstanceOf(RecurringBill);
    expect(recurringBill.name).toEqual('Internet banda larga');
    expect(recurringBill.estimated_amount).toEqual(199);
    expect(recurringBill.due_date).toEqual(parseISO('2022-08-10'));
    expect(recurringBill.active).toEqual(true);
    expect(recurringBill.user_id).toEqual('1');
  });
});
