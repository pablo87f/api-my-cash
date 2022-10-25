import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';

type PayWithCreditCardDto = {
  credit_card_id: string;
  user_id: string;
  value_to_pay: number;
};

export default class PayWithCreditCard {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute({
    credit_card_id,
    user_id,
    value_to_pay,
  }: PayWithCreditCardDto): Promise<CreditCard> {
    const creditCard = await this.creditCardsRepository.findOne({
      id: credit_card_id,
      user_id,
    });

    const updatedCreditCard = await this.creditCardsRepository.update(
      credit_card_id,
      {
        ...creditCard.props,
        spent_amount: creditCard.spent_amount + value_to_pay,
      },
    );

    return updatedCreditCard;
  }
}
