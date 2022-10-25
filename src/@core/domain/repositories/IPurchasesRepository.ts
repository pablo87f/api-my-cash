import { ExpenseProps } from '../entities/expense';
import { PaymentMethod, Purchase, PurchaseProps } from '../entities/purchase';

export type CreatePurchaseDto = {
  name: string;
  portions?: number;
  total_amount: number;
  user_id: string;
  due_date: Date;
  payment_method: PaymentMethod;
  wallet_id?: string;
  credit_card_id?: string;
};

export type PurchaseFilters = Partial<PurchaseProps>;

export type UpdatePurchaseDto = {
  active?: boolean;
  name?: string;
  portions?: number;
  total_amount?: number;
  user_id?: string;
  due_date?: Date;
  payment_method?: PaymentMethod;
  wallet_id?: string;
  credit_card_id?: string;
};

export default interface IPurchasesRepository {
  create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase>;
  update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase>;
  retrieve(filters: PurchaseFilters): Promise<Purchase[]>;
}
