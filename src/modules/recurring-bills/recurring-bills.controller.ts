import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { parseISO } from 'date-fns';
import CreateRecurringBill from 'src/@core/application/use-cases/recurring-bill/create-recurring-bill';
import GetRecurringBill from 'src/@core/application/use-cases/recurring-bill/get-recurring-bill';
import RetrieveRecurringBillsByMonth from 'src/@core/application/use-cases/recurring-bill/retrieve-recurring-bills-by-month';
import { CreateRecurringBillDto } from 'src/@core/domain/repositories/IRecurringBillsRepository';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';

@Controller('recurring-bills')
export class RecurringBillsController {
  constructor(
    private readonly retrieveRecurringBillByMonth: RetrieveRecurringBillsByMonth, // private readonly createRecurringBill: CreateRecurringBill, // private readonly getRecurringBill: GetRecurringBill, // private readonly updateRecurringBill: UpdateRecurringBill,
  ) {}

  // @Post()
  // create(@Body() createRecurringBillDto: CreateRecurringBillDto) {
  //   return this.createRecurringBill.execute(createRecurringBillDto);
  // }

  @Get(':month/:year')
  findAll(@Param('month') month: string, @Param('year') year: string) {
    const ref_month = parseISO(`${year}-${month}-01`);

    return this.retrieveRecurringBillByMonth.execute({
      user_id,
      ref_month,
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.getRecurringBill.execute({ id, user_id });
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRecurringBillDto: UpdateRecurringBillDto,
  // ) {
  //   return this.updateRecurringBill.execute(+id, updateRecurringBillDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recurringBillsService.remove(+id);
  // }
}
