import { format } from 'date-fns';
import IRecurringBillsRepository from '../../../domain/repositories/IRecurringBillsRepository';
import CreateExpenseForRecurringBill from '../expense/create-expense-for-recurring-bill';
import PayWithDebitWallet from '../wallet/pay-with-debit-wallet';
import GetRecurringBill from './get-recurring-bill';

type Input = {
  real_amount: number;
  wallet_id: string;
  refDate: Date;
};

export default class PayRecurringBill {
  constructor(
    readonly getRecurringBill: GetRecurringBill,
    readonly createExpenseForRecurringBill: CreateExpenseForRecurringBill,
    readonly recurringBillsRepository: IRecurringBillsRepository,
    readonly payWithDebitWallet: PayWithDebitWallet,
  ) {}

  async execute(
    recurring_bill_id: string,
    user_id: string,
    { real_amount, wallet_id, refDate }: Input,
  ) {
    const recurringBill = await this.getRecurringBill.execute({
      id: recurring_bill_id,
      user_id,
    });

    const createdExpense = await this.createExpenseForRecurringBill.execute({
      amount: real_amount,
      due_date: refDate,
      name: `${recurringBill.name} - ${format(refDate, 'MM/yyyy')}`,
      recurring_bill_id: recurringBill.id,
      user_id,
    });

    recurringBill.expenses.push(createdExpense);
    const expencesTotalAmount = recurringBill.expenses.reduce(
      (prev, current) => prev + current.amount,
      0,
    );

    const expensesAmountAvg =
      expencesTotalAmount / recurringBill.expenses.length;

    const updatedRecurringBill = await this.recurringBillsRepository.update(
      recurring_bill_id,
      {
        ...recurringBill.props,
        estimated_amount: expensesAmountAvg,
      },
    );

    await this.payWithDebitWallet.execute({
      wallet_id,
      user_id,
      value_to_pay: real_amount,
    });

    return updatedRecurringBill;
  }
}
