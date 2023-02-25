import { Wallet } from '../../../domain/entities/wallet';
import IWalletsRepository from '../../../domain/repositories/IWalletsRepository';

type Input = {
  id: string;
  user_id: string;
};

export default class GetUserWallet {
  constructor(readonly walletsRepository: IWalletsRepository) {}

  async execute({ user_id, id }: Input): Promise<Wallet> {
    return this.walletsRepository.findOne({ id, user_id });
  }
}
