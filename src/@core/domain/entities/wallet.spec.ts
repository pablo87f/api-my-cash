import { Wallet } from './wallet';

describe('Wallet', () => {
  it('should be defined', () => {
    const wallet = new Wallet({
      user_id: 'user1',
      name: 'Conta Nubank',
      amount: 1000,
    });

    expect(wallet).toBeInstanceOf(Wallet);
    expect(wallet.name).toEqual('Conta Nubank');
    expect(wallet.amount).toEqual(1000);
    expect(wallet.active).toEqual(true);
    expect(wallet.user_id).toEqual('user1');
  });
});
