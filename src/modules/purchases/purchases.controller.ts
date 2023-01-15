import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { parseISO } from 'date-fns';
import CreatePurchaseWithCreditCard, {
  CreatePurchaseWithCreditCardDto,
} from 'src/@core/application/use-cases/purchase/create-purchase-with-credit-card';

import CreatePurchaseWithDebitWallet, {
  CreatePurchaseWithDebitWalletDto,
} from 'src/@core/application/use-cases/purchase/create-purchase-with-debit-wallet';
import DeletePurchase from 'src/@core/application/use-cases/purchase/delete-purchase';
import RetrievePurchasesByUser from 'src/@core/application/use-cases/purchase/retrieve-purchases-by-user';
import loggedUser from '../loggedUser';

const user_id = loggedUser.id;
@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly createPurchaseWithDebitWallet: CreatePurchaseWithDebitWallet,
    private readonly retrievePurchasesByUser: RetrievePurchasesByUser,
    private readonly createPurchaseWithCreditCard: CreatePurchaseWithCreditCard,
    private readonly deletePurchase: DeletePurchase,
  ) {}

  @Post('debit')
  createWithDebit(
    @Body()
    createPurchaseDto: Omit<CreatePurchaseWithDebitWalletDto, 'user_id'>,
  ) {
    return this.createPurchaseWithDebitWallet.execute({
      ...createPurchaseDto,
      user_id,
    });
  }

  @Post('credit')
  createWithCredit(
    @Body()
    { due_date, ...rest }: Omit<CreatePurchaseWithCreditCardDto, 'user_id'>,
  ) {
    return this.createPurchaseWithCreditCard.execute({
      due_date: parseISO(`${due_date}`),
      ...rest,
      user_id,
    });
  }

  @Get()
  findAll() {
    return this.retrievePurchasesByUser.execute({ user_id });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchasesService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePurchaseDto: UpdatePurchaseDto,
  // ) {
  //   return this.purchasesService.update(id, { ...updatePurchaseDto, user_id });
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePurchase.execute(id, user_id);
  }
}
