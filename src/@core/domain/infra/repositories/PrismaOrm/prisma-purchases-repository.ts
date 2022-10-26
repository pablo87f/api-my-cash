import { Purchase, PurchaseProps } from 'src/@core/domain/entities/purchase';
import IPurchasesRepository, {
  CreatePurchaseDto,
  UpdatePurchaseDto,
} from 'src/@core/domain/repositories/IPurchasesRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaPurchasesRepository implements IPurchasesRepository {
  constructor(readonly db: DbService) {}

  async findOne(id: string): Promise<Purchase> {
    const purchase = await this.db.purchase.findFirst({
      where: { id },
      orderBy: {
        created_at: 'desc',
      },
    });
    return new Purchase(purchase);
  }

  async delete(id: string): Promise<Purchase> {
    const purchase = await this.db.purchase.delete({
      where: {
        id,
      },
    });
    return new Purchase(purchase);
  }

  async update(
    id: string,
    {
      due_date,
      name,
      payment_method,
      total_amount,
      user_id,
      credit_card_id,
      portions,
      wallet_id,
      active,
    }: UpdatePurchaseDto,
  ): Promise<Purchase> {
    const purchase = await this.db.purchase.update({
      where: {
        id,
      },
      data: {
        active,
        credit_card_id,
        due_date,
        name,
        payment_method,
        portions,
        total_amount,
        user_id,
        wallet_id,
      },
    });
    return new Purchase(purchase);
  }

  async retrieve({ user_id }: Partial<PurchaseProps>): Promise<Purchase[]> {
    const purchases = await this.db.purchase.findMany({
      where: {
        user_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return purchases.map((props) => new Purchase(props));
  }

  async create({
    credit_card_id,
    wallet_id,
    user_id,
    due_date,
    name,
    payment_method,
    total_amount,
    portions = 1,
  }: CreatePurchaseDto): Promise<Purchase> {
    const purchase = await this.db.purchase.create({
      data: {
        user_id,
        due_date,
        name,
        payment_method,
        total_amount,
        portions,
        credit_card_id,
        wallet_id,
      },
    });
    return new Purchase(purchase);
  }
}
