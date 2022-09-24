import { randomUUID } from 'crypto';
import { CreditCard } from '../../../entities/credit-card';
import ICreditCardsRepository, {
  CreateCreditCardDto,
} from '../../../repositories/ICreditCardsRepository';

export default class CreditCardsInMemoryRepository
  implements ICreditCardsRepository
{
  private creditCards: CreditCard[];

  constructor() {
    this.creditCards = [];
  }

  async create({
    total_limit,
    name,
    user_id,
  }: CreateCreditCardDto): Promise<CreditCard> {
    const creditCard: CreditCard = new CreditCard({
      id: randomUUID(),
      total_limit,
      name,
      user_id,
    });

    this.creditCards.push(creditCard);
    return creditCard;
  }
}
