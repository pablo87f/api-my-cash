import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecurringExpensesService } from './recurring-expenses.service';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';

@Controller('recurring-expenses')
export class RecurringExpensesController {
  constructor(
    private readonly recurringExpensesService: RecurringExpensesService,
  ) {}

  @Post()
  create(@Body() createRecurringExpenseDto: CreateRecurringExpenseDto) {
    return this.recurringExpensesService.create({
      ...createRecurringExpenseDto,
      user_id,
    });
  }

  @Get()
  findAll() {
    return this.recurringExpensesService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringExpensesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecurringExpenseDto: UpdateRecurringExpenseDto,
  ) {
    return this.recurringExpensesService.update(id, updateRecurringExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringExpensesService.remove(id);
  }
}
