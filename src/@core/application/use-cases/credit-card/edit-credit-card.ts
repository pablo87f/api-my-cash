import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';
import GetCreditCard from './get-credit-card';

type EditCreditCardDto = {
  name: string;
  total_limit: number;
  spent_amount?: number;
  active?: boolean;
};

export default class EditCreditCard {
  constructor(
    readonly creditCardsRepository: ICreditCardsRepository,
    readonly getCreditCard: GetCreditCard,
  ) {}

  async execute(
    credit_card_id: string,
    user_id: string,
    editCreditCardDto: EditCreditCardDto,
  ): Promise<CreditCard> {
    const found = await this.getCreditCard.execute({ credit_card_id, user_id });

    const updatedCreditCard = await this.creditCardsRepository.update(
      credit_card_id,
      {
        ...found.props,
        ...editCreditCardDto,
      },
    );

    return updatedCreditCard;
  }
}
