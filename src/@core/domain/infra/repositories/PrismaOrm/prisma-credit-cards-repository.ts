import { CreditCard } from 'src/@core/domain/entities/credit-card';
import ICreditCardsRepository, {
  CreateCreditCardDto,
  FilterCreditCardDto,
} from 'src/@core/domain/repositories/ICreditCardsRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaCreditCardsRepository
  implements ICreditCardsRepository
{
  constructor(readonly db: DbService) {}
  async create({
    name,
    total_limit,
    user_id,
    spent_amount,
  }: CreateCreditCardDto): Promise<CreditCard> {
    const createdCreditCard = await this.db.creditCard.create({
      data: {
        name,
        spent_amount,
        total_limit,
        user_id,
      },
    });
    return new CreditCard(createdCreditCard);
  }
  get(id: string, user_id: string): Promise<CreditCard> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    updateCreditCardDto: Partial<CreditCard>,
  ): Promise<CreditCard> {
    throw new Error('Method not implemented.');
  }
  async find(filters: FilterCreditCardDto): Promise<CreditCard[]> {
    const creditCarts = await this.db.creditCard.findMany({
      where: filters,
    });
    return creditCarts.map(
      (creditCardProps) => new CreditCard(creditCardProps),
    );
  }
}
