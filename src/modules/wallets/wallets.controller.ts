import { Body, Controller, Post } from '@nestjs/common';

import CreateWallet, {
  CreateWalletDto,
} from 'src/@core/application/use-cases/wallet/create-wallet';

const user_id = 'b314a256-12b7-4fab-84ff-425525e88ad4';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly createWallet: CreateWallet) {}

  @Post()
  create(@Body() createWalletDto: Omit<CreateWalletDto, 'user_id'>) {
    return this.createWallet.execute({ ...createWalletDto, user_id });
  }

  // @Get()
  // findAll() {
  //   return this.walletsService.findAll(user_id);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.walletsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
  //   return this.walletsService.update(id, { ...updateWalletDto, user_id });
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.walletsService.remove(id);
  // }
}
