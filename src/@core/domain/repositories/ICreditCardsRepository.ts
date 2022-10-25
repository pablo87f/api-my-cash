import { CreditCard } from '../entities/credit-card';

export type CreateCreditCardDto = {
  name: string;
  total_limit: number;
  spent_amount?: number;
  user_id: string;
};

export type FilterCreditCardDto = {
  id?: string;
  user_id?: string;
};

export type UpdateCreditCardDto = Partial<CreditCard>;

export default interface ICreditCardsRepository {
  create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard>;
  get(id: string, user_id: string): Promise<CreditCard>;
  update(
    id: string,
    updateCreditCardDto: UpdateCreditCardDto,
  ): Promise<CreditCard>;
  find(filters: FilterCreditCardDto): Promise<CreditCard[]>;
}
