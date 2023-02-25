import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import CreateWallet, {
  CreateWalletDto,
} from 'src/@core/application/use-cases/wallet/create-wallet';
import GetUserWallet from 'src/@core/application/use-cases/wallet/get-user-wallet';
import RetrieveWalletsByUser from 'src/@core/application/use-cases/wallet/retrieve-wallets-by-user';
import UpdateUserWallet from 'src/@core/application/use-cases/wallet/update-user-wallet';
import { WalletDataToUpdate } from 'src/@core/domain/repositories/IWalletsRepository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly retrieveWalletsByUser: RetrieveWalletsByUser,
    private readonly getUserWallet: GetUserWallet,
    private readonly updateUserWallet: UpdateUserWallet,
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

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const user_id = req.user.id;
    return this.getUserWallet.execute({ id, user_id });
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWalletDto: WalletDataToUpdate,
  ) {
    const user_id = req.user.id;
    return this.updateUserWallet.execute({
      id,
      user_id,
      dataToUpdate: { ...updateWalletDto },
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.walletsService.remove(id);
  // }
}
