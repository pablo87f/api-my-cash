import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import CreateWallet, {
  CreateWalletDto,
} from 'src/@core/application/use-cases/wallet/create-wallet';
import RetrieveWalletsByUser from 'src/@core/application/use-cases/wallet/retrieve-wallets-by-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import loggedUser from '../loggedUser';

// const user_id = loggedUser.id;
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly retrieveWalletsByUser: RetrieveWalletsByUser,
    private readonly createWallet: CreateWallet,
  ) {}

  @Post()
  create(
    @Req() req,
    @Body() createWalletDto: Omit<CreateWalletDto, 'user_id'>,
  ) {
    const user_id = req.user.id;
    return this.createWallet.execute({ ...createWalletDto, user_id });
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.retrieveWalletsByUser.execute({ user_id: userId });
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
