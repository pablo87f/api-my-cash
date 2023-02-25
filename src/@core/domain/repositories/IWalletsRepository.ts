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

export type WalletDataToUpdate = Omit<
  Partial<Wallet>,
  'id' | 'user_id' | 'props'
>;

export type UpdateWalletDto = {
  id: string;
  dataToUpdate: WalletDataToUpdate;
};

export default interface IWalletsRepository {
  create(createWalletDto: CreateWalletDto): Promise<Wallet>;
  update(updateWalletDto: UpdateWalletDto): Promise<Wallet>;
  find(filters: FiltersWalletDto): Promise<Wallet[]>;
  findOne(filters: FiltersWalletDto): Promise<Wallet>;
}
