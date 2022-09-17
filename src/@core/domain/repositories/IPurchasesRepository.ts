import { Expense } from '../entities/expense';
import { PaymentMethod, Purchase } from '../entities/purchase';

export type CreatePurchaseDto = {
  name: string;
  portions: number;
  total_amount: number;
  user_id: string;
  due_date: Date;
  payment_method: PaymentMethod;
};

export type UpdatePurchaseDto = Partial<Purchase>;

export default interface IPurchasesRepository {
  create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase>;
  update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase>;
}
