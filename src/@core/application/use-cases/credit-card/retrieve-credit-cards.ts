import ICreditCardsRepository from '../../../domain/repositories/ICreditCardsRepository';

export default class RetrieveCreditCards {
  constructor(readonly creditCardsRepository: ICreditCardsRepository) {}

  async execute(user_id: string) {
    const creditCards = await this.creditCardsRepository.retrieve(user_id);
    return creditCards;
  }
}
