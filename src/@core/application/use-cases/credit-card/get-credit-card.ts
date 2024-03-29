import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';

type GetCreditCardInput = {
  id: string;
  user_id: string;
};

export default class GetCreditCard {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute({ id, user_id }: GetCreditCardInput): Promise<CreditCard> {
    const found = await this.creditCardsRepository.findOne({
      id,
      user_id,
    });
    if (!found) {
      return undefined;
    }
    return found;
  }
}
