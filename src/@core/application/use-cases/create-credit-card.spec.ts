import { CreditCard } from '../../domain/entities/credit-card';
import CreditCardInMemoryRepository from '../../domain/infra/repositories/InMemory/CreditCardsInMemoryRepository';
import CreateCreditCard from './create-credit-card';

describe('Create creadit card', () => {
  it('should create a creadit card', async () => {
    const creditCardInMemoryRepository = new CreditCardInMemoryRepository();
    const createCreditCard = new CreateCreditCard(creditCardInMemoryRepository);

    const creditCard: CreditCard = await createCreditCard.execute({
      name: 'Cartão Nubank',
      total_limit: 2000,
      user_id: '1',
    });

    expect(creditCard.name).toEqual('Cartão Nubank');
    expect(creditCard.total_limit).toEqual(2000);
  });
});
