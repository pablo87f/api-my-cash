import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import CreatePurchaseWithDebitWallet, {
  CreatePurchaseWithDebitWalletDto,
} from 'src/@core/application/use-cases/purchase/create-purchase-with-debit-wallet';
import RetrievePurchasesByUser from 'src/@core/application/use-cases/purchase/retrieve-purchases-by-user';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';
@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly createPurchase: CreatePurchaseWithDebitWallet,
    private readonly retrievePurchasesByUser: RetrievePurchasesByUser,
  ) {}

  @Post('debit')
  create(
    @Body()
    createPurchaseDto: Omit<CreatePurchaseWithDebitWalletDto, 'user_id'>,
  ) {
    return this.createPurchase.execute({ ...createPurchaseDto, user_id });
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
