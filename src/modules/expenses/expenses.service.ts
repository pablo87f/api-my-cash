import { Injectable } from '@nestjs/common';
import { Expense, RecurringExpense } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { BuildExpenseFromPruchaseDto } from './dto/build-expense-from-pruchase.dto';
import { addMonths, format } from 'date-fns';
import { DbService } from 'src/database/db.service';

@Injectable()
export class ExpensesService {
  constructor(private db: DbService) {}

  buildExpensesFromPurchase({
    name,
    portions = 1,
    total_amount,
    due_date,
    user_id,
    payment_method,
  }: BuildExpenseFromPruchaseDto) {
    if (payment_method === 'CREDIT') {
      const portionList = Array.from({ length: portions }, (_, i) => i + 1);
      const expenseAmount = total_amount / portions;
      const expenses: {
        amount: number;
        name: string;
        due_date: Date;
        user_id: string;
      }[] = portionList.map((portion) => {
        const portionName = `${name} - ${portion}/${portions}`;
        return {
          amount: expenseAmount,
          name: portionName,
          due_date: addMonths(due_date, portion),
          user_id,
        };
      });
      return expenses as Expense[];
    }
    // DEBIT
    return [
      {
        amount: total_amount,
        name,
        due_date,
        user_id,
      },
    ] as Expense[];
  }

  buildExpenseFromRecurringExpense(
    recurringExpense: RecurringExpense,
    refDate: Date,
  ) {
    const expenseNameComplement = format(refDate, 'MM/yyyy');
    const [year, month] = refDate.toISOString().substring(0, 10).split('-');

    const expenseDueDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      recurringExpense.due_date.getDate(),
    );

    return {
      amount: recurringExpense.estimated_amount,
      name: `${recurringExpense.name} - ${expenseNameComplement}`,
      due_date: expenseDueDate,
      user_id: recurringExpense.user_id,
      recurring_expense_id: recurringExpense.id,
    };
  }

  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  async findAll(user_id: string) {
    const expenses = await this.db.expense.findMany({
      where: {
        user_id,
      },
      orderBy: {
        due_date: 'asc',
      },
    });
    return expenses;
  }

  async findOne(id: string) {
    const expenses = await this.db.expense.findMany({
      where: {
        id,
      },
      orderBy: {
        due_date: 'asc',
      },
    });
    return expenses;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    if (expense) {
      const updatedExpense = await this.db.expense.update({
        data: {
          ...updateExpenseDto,
        },
        where: {
          id,
        },
      });
      return updatedExpense;
    }
    return undefined;
  }

  async remove(id: string) {
    const expense = await this.findOne(id);
    if (expense) {
      const deletedExpense = await this.db.expense.delete({
        where: {
          id,
        },
      });

      return !!deletedExpense;
    }
    return false;
  }
}
