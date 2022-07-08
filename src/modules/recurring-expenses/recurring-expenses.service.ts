import { Injectable } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';

@Injectable()
export class RecurringExpensesService {
  constructor(private readonly db: DbService) {}

  async create(createRecurringExpenseDto: CreateRecurringExpenseDto) {
    const recurringExpenses = await this.db.recurringExpense.create({
      data: {
        ...createRecurringExpenseDto,
      },
    });
    return recurringExpenses;
  }

  async findAll(user_id: string) {
    const recurringExpenses = await this.db.recurringExpense.findMany({
      where: {
        user_id,
      },
      orderBy: {
        due_date: 'asc',
      },
    });
    return recurringExpenses;
  }

  async findOne(id: string) {
    const recurringExpense = await this.db.recurringExpense.findUnique({
      where: {
        id,
      },
    });
    return recurringExpense;
  }

  async update(
    id: string,
    updateRecurringExpenseDto: UpdateRecurringExpenseDto,
  ) {
    const recurringExpense = await this.db.recurringExpense.update({
      data: {
        ...updateRecurringExpenseDto,
      },
      where: {
        id,
      },
    });

    return recurringExpense;
  }

  remove(id: string) {
    return `This action removes a #${id} recurringExpense`;
  }
}
