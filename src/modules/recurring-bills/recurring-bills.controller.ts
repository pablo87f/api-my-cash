import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { parseISO } from 'date-fns';
import CreateRecurringBill from 'src/@core/application/use-cases/recurring-bill/create-recurring-bill';
import RetrieveRecurringBillsByUser from 'src/@core/application/use-cases/recurring-bill/retrieve-recurring-bills-by-user';
import { CreateRecurringBillDto } from 'src/@core/domain/repositories/IRecurringBillsRepository';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';

@Controller('recurring-bills')
export class RecurringBillsController {
  constructor(
    private readonly createRecurringBill: CreateRecurringBill, // private readonly getRecurringBill: GetRecurringBill, // private readonly updateRecurringBill: UpdateRecurringBill,
    private readonly retrieveRecurringBillByUser: RetrieveRecurringBillsByUser,
  ) {}

  @Post()
  create(
    @Body() createRecurringBillDto: Omit<CreateRecurringBillDto, 'user_id'>,
  ) {
    return this.createRecurringBill.execute({
      ...createRecurringBillDto,
      user_id,
    });
  }

  @Get()
  findAll() {
    return this.retrieveRecurringBillByUser.execute({ user_id });
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
