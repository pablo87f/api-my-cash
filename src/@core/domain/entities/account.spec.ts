import { Account } from './account';

describe('Account', () => {
  it('should be defined', () => {
    const account = new Account({
      id: 'account1',
      name: 'Pablo Fernandes',
      user_ids: ['user1'],
    });

    expect(account).toBeInstanceOf(Account);
    expect(account.name).toEqual('Pablo Fernandes');
    expect(account.user_ids).toHaveLength(1);
    expect(account.user_ids[0]).toEqual('user1');
    expect(account.active).toBeTruthy();
  });
});
