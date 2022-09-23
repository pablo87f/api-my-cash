import { CreditCard } from './credit-card';

describe('Credit Card', () => {
  it('should be defined', () => {
    const creditCard = new CreditCard({
      name: 'Cartão Nubank',
      total_limit: 1000,
    });

    expect(creditCard).toBeInstanceOf(CreditCard);
    expect(creditCard.name).toEqual('Cartão Nubank');
    expect(creditCard.total_limit).toEqual(1000);
  });

  it('should calculate the remaining limit', () => {
    const creditCard = new CreditCard({
      name: 'Cartão Nubank',
      total_limit: 1000,
      spent_amount: 300,
    });

    expect(creditCard).toBeInstanceOf(CreditCard);
    expect(creditCard.name).toEqual('Cartão Nubank');
    expect(creditCard.total_limit).toEqual(1000);
    expect(creditCard.spent_amount).toEqual(300);
    expect(creditCard.remaining_limit).toEqual(700);
  });
});
