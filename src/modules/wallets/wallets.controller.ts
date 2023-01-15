import { Body, Controller, Get, Post } from '@nestjs/common';

import CreateWallet, {
  CreateWalletDto,
} from 'src/@core/application/use-cases/wallet/create-wallet';
import RetrieveWalletsByUser from 'src/@core/application/use-cases/wallet/retrieve-wallets-by-user';
import loggedUser from '../loggedUser';

const user_id = loggedUser.id;

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly retrieveWalletsByUser: RetrieveWalletsByUser,
    private readonly createWallet: CreateWallet,
  ) {}

  @Post()
  create(@Body() createWalletDto: Omit<CreateWalletDto, 'user_id'>) {
    return this.createWallet.execute({ ...createWalletDto, user_id });
  }

  @Get()
  findAll() {
    return this.retrieveWalletsByUser.execute({ user_id });
  }

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
