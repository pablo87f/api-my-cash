import { Wallet } from '../../../domain/entities/wallet';
import IWalletsRepository from '../../../domain/repositories/IWalletsRepository';

type PayWithDebitWalletDto = {
  wallet_id: string;
  user_id: string;
  value_to_pay: number;
};

export default class PayWithDebitWallet {
  constructor(readonly walletsRepository: IWalletsRepository) {}

  async execute({
    wallet_id,
    user_id,
    value_to_pay,
  }: PayWithDebitWalletDto): Promise<Wallet> {
    const wallet = await this.walletsRepository.get(wallet_id, user_id);

    const updatedWallet = await this.walletsRepository.update(wallet_id, {
      ...wallet.props,
      amount: wallet.amount - value_to_pay,
    });

    return updatedWallet;
  }
}
