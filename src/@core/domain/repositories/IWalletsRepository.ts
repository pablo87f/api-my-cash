import { Wallet } from '../entities/wallet';

export type CreateWalletDto = {
  amount: number;
  name: string;
  user_id: string;
};

export default interface IWalletsRepository {
  create(createWalletDto: CreateWalletDto): Promise<Wallet>;
  get(id: string): Promise<Wallet>;
}
