import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';

export type CreateCrediCardDto = {
  name: string;
  total_limit: number;
  spent_amount?: number;
  user_id: string;
};

export default class CreateCreditCard {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute({
    name,
    total_limit,
    spent_amount,
    user_id,
  }: CreateCrediCardDto): Promise<CreditCard> {
    const createdCreditCard = await this.creditCardsRepository.create({
      name,
      total_limit,
      spent_amount,
      user_id,
    });

    return createdCreditCard;
  }
}
