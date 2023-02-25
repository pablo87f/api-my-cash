import { Wallet } from '../../../domain/entities/wallet';
import IWalletsRepository, {
  WalletDataToUpdate,
} from '../../../domain/repositories/IWalletsRepository';
import GetUserWallet from './get-user-wallet';

type UpdateUserWalletDto = {
  id: string;
  user_id: string;
  dataToUpdate: WalletDataToUpdate;
};

export default class UpdateUserWallet {
  constructor(
    readonly getUserWallet: GetUserWallet,
    readonly walletsRepository: IWalletsRepository,
  ) {}

  async execute({
    user_id,
    id,
    dataToUpdate,
  }: UpdateUserWalletDto): Promise<Wallet> {
    const userWallet = await this.getUserWallet.execute({ user_id, id });
    if (!userWallet) return undefined;
    return this.walletsRepository.update({ id, dataToUpdate });
  }
}
