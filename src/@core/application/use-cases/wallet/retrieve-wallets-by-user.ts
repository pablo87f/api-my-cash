import { Wallet } from '../../../domain/entities/wallet';
import IWalletsRepository from '../../../domain/repositories/IWalletsRepository';

type Input = {
  user_id: string;
};

export default class RetrieveWalletsByUser {
  constructor(readonly walletsRepository: IWalletsRepository) {}

  async execute({ user_id }: Input): Promise<Wallet[]> {
    return this.walletsRepository.retrieve(user_id);
  }
}
