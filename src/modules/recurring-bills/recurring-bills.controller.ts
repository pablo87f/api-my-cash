import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import CreateRecurringBill from 'src/@core/application/use-cases/recurring-bill/create-recurring-bill';
import GetRecurringBill from 'src/@core/application/use-cases/recurring-bill/get-recurring-bill';
import RetrieveRecurringBillsByUser from 'src/@core/application/use-cases/recurring-bill/retrieve-recurring-bills-by-user';
import { CreateRecurringBillDto } from 'src/@core/domain/repositories/IRecurringBillsRepository';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import loggedUser from '../loggedUser';

@UseGuards(JwtAuthGuard)
@Controller('recurring-bills')
export class RecurringBillsController {
  constructor(
    private readonly createRecurringBill: CreateRecurringBill,
    private readonly retrieveRecurringBillByUser: RetrieveRecurringBillsByUser,
    private readonly getRecurringBill: GetRecurringBill, // private readonly updateRecurringBill: UpdateRecurringBill,
  ) {}

  @Post()
  create(
    @Req() req,
    @Body() createRecurringBillDto: Omit<CreateRecurringBillDto, 'user_id'>,
  ) {
    const user_id = req.user.id;
    return this.createRecurringBill.execute({
      ...createRecurringBillDto,
      user_id,
    });
  }

  @Get()
  findAll(@Req() req) {
    const user_id = req.user.id;
    return this.retrieveRecurringBillByUser.execute({ user_id });
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Req() req, @Param('id') id: string) {
    const user_id = req.user.id;
    const recurringBill = await this.getRecurringBill.execute({ id, user_id });

    if (!recurringBill) {
      throw new NotFoundException();
    }

    return recurringBill;
  }

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
