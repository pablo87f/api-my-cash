import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';
import NotFoundError from '../../errors/not-found.error';

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
    const found = await this.creditCardsRepository.get(credit_card_id, user_id);
    if (!found) {
      throw new NotFoundError();
    }
    return found;
  }
}
