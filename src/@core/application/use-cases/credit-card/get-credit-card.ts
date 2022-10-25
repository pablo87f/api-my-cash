import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';

type GetCreditCardInput = {
  credit_card_id: string;
  user_id: string;
};

export default class GetCreditCard {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute({
    credit_card_id,
    user_id,
  }: GetCreditCardInput): Promise<CreditCard> {
    const found = await this.creditCardsRepository.findOne({
      id: credit_card_id,
      user_id,
    });
    if (!found) {
      return undefined;
    }
    return found;
  }
}
