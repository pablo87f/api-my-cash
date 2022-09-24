import { Wallet } from '../../../domain/entities/wallet';
import IWalletsRepository from '../../../domain/repositories/IWalletsRepository';

type Input = {
  name: string;
  amount: number;
  user_id: string;
};

type Output = Wallet;

export default class CreateWallet {
  constructor(readonly walletsRepository: IWalletsRepository) {}

  async execute({ name, amount, user_id }: Input): Promise<Output> {
    const createdWallet = await this.walletsRepository.create({
      name,
      amount,
      user_id,
    });

    return createdWallet;
  }
}
