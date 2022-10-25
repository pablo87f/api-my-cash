import ICreditCardsRepository, {
  FilterCreditCardDto,
} from '../../../domain/repositories/ICreditCardsRepository';

export default class RetrieveCreditCards {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute(filters: FilterCreditCardDto) {
    const creditCards = await this.creditCardsRepository.find(filters);
    return creditCards;
  }
}
