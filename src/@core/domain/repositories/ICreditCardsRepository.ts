import { CreditCard } from '../entities/credit-card';

export type CreateCreditCardDto = {
  name: string;
  total_limit: number;
  spent_amount?: number;
  user_id: string;
};

export type FilterCreditCardDto = Partial<CreditCard>;

export type CreditCardDataToUpdate = Omit<
  Partial<CreditCard>,
  'id' | 'user_id' | 'props'
>;

export type UpdateCreditCardDto = {
  id: string;
  dataToUpdate: CreditCardDataToUpdate;
};

export default interface ICreditCardsRepository {
  create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard>;
  findOne(filters: FilterCreditCardDto): Promise<CreditCard>;
  update(updateCreditCardDto: UpdateCreditCardDto): Promise<CreditCard>;
  find(filters: FilterCreditCardDto): Promise<CreditCard[]>;
}
