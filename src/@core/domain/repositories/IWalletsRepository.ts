import { Wallet } from '../entities/wallet';

export type CreateWalletDto = {
  amount: number;
  name: string;
  user_id: string;
};

export type FiltersWalletDto = {
  id?: string;
  user_id?: string;
};

export type UpdateWalletDto = Partial<Wallet>;

export default interface IWalletsRepository {
  create(createWalletDto: CreateWalletDto): Promise<Wallet>;
  update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet>;
  find(filters: FiltersWalletDto): Promise<Wallet[]>;
  findOne(filters: FiltersWalletDto): Promise<Wallet>;
}
