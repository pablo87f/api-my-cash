import { faker } from '@faker-js/faker';
import { subMonths } from 'date-fns';
import { Expense, ExpenseProps } from '../expense';

const expensesFactory = {
  makeMany: (size: number, fixedFields: Partial<ExpenseProps>): Expense[] => {
    const expenses: Expense[] = [];
    for (let i = 0; i < size; i++) {
      expenses.push(
        new Expense({
          due_date: faker.date.recent(),
          amount: faker.datatype.number({
            max: 2000,
            min: 30,
            precision: 2,
          }),
          name: faker.finance.accountName(),
          active: true,
          user_id: faker.datatype.uuid(),
          ...fixedFields,
        }),
      );
    }
    return expenses;
  },
  makeManySequencialDate: (
    size: number,
    dateRef: Date,
    fixedFields: Partial<ExpenseProps>,
  ): Expense[] => {
    const expenses: Expense[] = [];
    for (let i = 0; i < size; i++) {
      expenses.push(
        new Expense({
          due_date: subMonths(dateRef, i),
          amount: faker.datatype.number({
            max: 2000,
            min: 30,
            precision: 2,
          }),
          name: faker.finance.accountName(),
          active: true,
          user_id: faker.datatype.uuid(),
          ...fixedFields,
        }),
      );
    }
    return expenses;
  },
};

export default expensesFactory;
