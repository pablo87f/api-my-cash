import { CreditCard } from '../entities/credit-card';

export type CreateCreditCardDto = {
  name: string;
  total_limit: number;
  spent_amount?: number;
  user_id: string;
};

export default interface ICreditCardsRepository {
  create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard>;
}
