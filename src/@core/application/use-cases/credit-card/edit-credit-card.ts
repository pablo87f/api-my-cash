import { CreditCard } from '../../../domain/entities/credit-card';
import ICreditCardsRepository, {
  CreditCardDataToUpdate,
} from '../../../domain/repositories/ICreditCardsRepository';
import GetCreditCard from './get-credit-card';

export type EditCreditCardDto = {
  credit_card_id: string;
  user_id: string;
  dataToUpdate: CreditCardDataToUpdate;
};

export default class EditCreditCard {
  constructor(
    readonly creditCardsRepository: ICreditCardsRepository,
    readonly getCreditCard: GetCreditCard,
  ) {}

  async execute({
    credit_card_id,
    user_id,
    dataToUpdate,
  }: EditCreditCardDto): Promise<CreditCard> {
    const found = await this.getCreditCard.execute({
      id: credit_card_id,
      user_id,
    });

    if (!found) return undefined;

    const updatedCreditCard = await this.creditCardsRepository.update({
      id: credit_card_id,
      dataToUpdate: dataToUpdate,
    });

    return updatedCreditCard;
  }
}
