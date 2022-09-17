import { randomUUID } from 'crypto';
import { Purchase } from '../../entities/purchase';
import IPurchasesRepository, {
  CreatePurchaseDto,
  UpdatePurchaseDto,
} from '../../repositories/IPurchasesRepository';

export default class PurchasesInMemoryRepository
  implements IPurchasesRepository
{
  private purchases: Purchase[];

  constructor() {
    this.purchases = [];
  }

  async update(
    id: string,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    const purchaseIndex = this.purchases.findIndex((item) => item.id === id);
    if (purchaseIndex >= 0) {
      const found = this.purchases[purchaseIndex];
      const updatedPurchase = new Purchase({
        name: found.name,
        total_amount: found.total_amount,
        due_date: found.due_date,
        payment_method: found.payment_method,
        ...found,
        ...updatePurchaseDto,
      });
      this.purchases[purchaseIndex] = updatedPurchase;
      return updatedPurchase;
    } else {
      throw new Error('Purchase not fournd');
    }
  }

  async create({
    due_date,
    name,
    payment_method,
    portions,
    total_amount,
    user_id,
  }: CreatePurchaseDto): Promise<Purchase> {
    const purchase = new Purchase({
      id: randomUUID(),
      active: true,
      due_date,
      expenses: [],
      name,
      payment_method,
      portions,
      total_amount,
      user_id,
    });
    this.purchases.push(purchase);
    return purchase;
  }
}
