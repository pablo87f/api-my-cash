import { Account } from './account';

describe('Account', () => {
  it('should be defined', () => {
    const account = new Account({
      id: 'account1',
      name: 'Pablo Fernandes',
    });

    expect(account).toBeInstanceOf(Account);
    expect(account.name).toEqual('Pablo Fernandes');
    expect(account.active).toBeTruthy();
  });
});
