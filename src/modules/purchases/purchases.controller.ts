import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import CreatePurchaseWithCreditCard, {
  CreatePurchaseWithCreditCardDto,
} from 'src/@core/application/use-cases/purchase/create-purchase-with-credit-card';

import CreatePurchaseWithDebitWallet, {
  CreatePurchaseWithDebitWalletDto,
} from 'src/@core/application/use-cases/purchase/create-purchase-with-debit-wallet';
import RetrievePurchasesByUser from 'src/@core/application/use-cases/purchase/retrieve-purchases-by-user';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';
@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly createPurchaseWithDebitWallet: CreatePurchaseWithDebitWallet,
    private readonly retrievePurchasesByUser: RetrievePurchasesByUser,
    private readonly createPurchaseWithCreditCard: CreatePurchaseWithCreditCard,
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
    createPurchaseDto: Omit<CreatePurchaseWithCreditCardDto, 'user_id'>,
  ) {
    return this.createPurchaseWithCreditCard.execute({
      ...createPurchaseDto,
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchasesService.remove(id);
  // }
}
