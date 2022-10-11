import { faker } from '@faker-js/faker';
import { RecurringBill, RecurringBillProps } from '../recurring-bill';

const recurringBillsFactory = {
  makeMany: (
    size: number,
    fixedFields: Partial<RecurringBillProps> = {},
  ): RecurringBill[] => {
    const recurringBills: RecurringBill[] = [];

    for (let i = 0; i < size; i++) {
      recurringBills.push(
        new RecurringBill({
          id: `recurringbill${i}`,
          due_date: faker.date.recent(),
          estimated_amount: faker.datatype.number({
            max: 2000,
            min: 30,
            precision: 2,
          }),
          name: faker.finance.accountName(),
          active: true,
          user_id: fixedFields.user_id,
          expenses: fixedFields?.expenses,
          ...fixedFields,
        }),
      );
    }
    return recurringBills;
  },
};

export default recurringBillsFactory;
