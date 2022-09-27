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

  async get(id: string): Promise<CreditCard> {
    const found = this.creditCards.find((creditCard) => creditCard.id === id);
    if (!found) {
      throw new Error('Not found');
    }
    return found;
  }

  async create({
    total_limit,
    name,
    spent_amount,
    user_id,
  }: CreateCreditCardDto): Promise<CreditCard> {
    const creditCard: CreditCard = new CreditCard({
      id: randomUUID(),
      total_limit,
      spent_amount,
      name,
      user_id,
    });

    this.creditCards.push(creditCard);
    return creditCard;
  }
}
