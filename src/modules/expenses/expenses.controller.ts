import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { format } from 'date-fns';
import RetrieveExpensesByDateRange from 'src/@core/application/use-cases/expense/retrieve-expenses-by-month';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly retrieveExpensesByMonth: RetrieveExpensesByDateRange,
  ) {}

  @Post()
  create(@Req() req, @Body() createExpenseDto: CreateExpenseDto) {
    const user_id = req.user.id;
    return this.expensesService.create({ ...createExpenseDto, user_id });
  }

  @Get()
  findAll(@Req() req, @Query('yearMonth') yearMonth: string) {
    const user_id = req.user.id;
    const account_id = req.user.account_id;

    return this.retrieveExpensesByMonth.execute({
      year_month: yearMonth ? yearMonth : format(new Date(), 'yyyy-MM'),
      user_id,
      account_id,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // const user_id = req.user.id;
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const user_id = req.user.id;
    return this.expensesService.update(id, { ...updateExpenseDto, user_id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // const user_id = req.user.id;
    return this.expensesService.remove(id);
  }
}
