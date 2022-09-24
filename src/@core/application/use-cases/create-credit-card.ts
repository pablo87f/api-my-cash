import { CreditCard } from '../../domain/entities/credit-card';
import ICreditCardsRepository from '../../domain/repositories/ICreditCardsRepository';

type CreateCrediCardDto = {
  name: string;
  total_limit: number;
  user_id: string;
};

export default class CreateCreditCard {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute({
    name,
    total_limit,
    user_id,
  }: CreateCrediCardDto): Promise<CreditCard> {
    const createdWallet = await this.creditCardsRepository.create({
      name,
      total_limit,
      user_id,
    });

    return createdWallet;
  }
}
