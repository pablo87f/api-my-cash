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
  async findOne(filters: FilterCreditCardDto): Promise<CreditCard> {
    const creditCard = await this.db.creditCard.findFirst({
      where: filters,
    });
    return creditCard !== null ? new CreditCard(creditCard) : undefined;
  }
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

  async update(
    id: string,
    updateCreditCardDto: Partial<CreditCard>,
  ): Promise<CreditCard> {
    const updated = await this.db.creditCard.update({
      where: {
        id,
      },
      data: updateCreditCardDto,
    });
    return new CreditCard(updated);
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
