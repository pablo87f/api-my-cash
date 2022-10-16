import { Wallet } from '../entities/wallet';

export type CreateWalletDto = {
  amount: number;
  name: string;
  user_id: string;
};

export type UpdateWalletDto = Partial<Wallet>;

export default interface IWalletsRepository {
  create(createWalletDto: CreateWalletDto): Promise<Wallet>;
  get(id: string, user_id: string): Promise<Wallet>;
  update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet>;
  retrieve(user_id: string): Promise<Wallet[]>;
}
