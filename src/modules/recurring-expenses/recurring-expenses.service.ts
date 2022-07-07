import { Injectable } from '@nestjs/common';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';

@Injectable()
export class RecurringExpensesService {
  create(createRecurringExpenseDto: CreateRecurringExpenseDto) {
    return 'This action adds a new recurringExpense';
  }

  findAll() {
    return `This action returns all recurringExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recurringExpense`;
  }

  update(id: number, updateRecurringExpenseDto: UpdateRecurringExpenseDto) {
    return `This action updates a #${id} recurringExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} recurringExpense`;
  }
}
