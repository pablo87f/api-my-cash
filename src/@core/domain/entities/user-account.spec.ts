import { parseISO } from 'date-fns';
import { UserAccount } from './user-account';

describe('User Account', () => {
  it('should be defined', () => {
    const userAccount = new UserAccount({
      account_id: 'account1',
      user_id: 'user1',
      assigned_at: parseISO('2023-02-14'),
      is_owner: true,
    });

    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount.account_id).toEqual('account1');
    expect(userAccount.user_id).toEqual('user1');
    expect(userAccount.is_owner).toBeTruthy();
    expect(userAccount.assigned_at).toEqual(parseISO('2023-02-14'));
    expect(userAccount.active).toBeTruthy();
  });

  it('should not be the onwer if dont pass the prop owner_id as true', () => {
    const userAccount = new UserAccount({
      account_id: 'account1',
      user_id: 'user1',
      assigned_at: parseISO('2023-02-14'),
    });

    expect(userAccount).toBeInstanceOf(UserAccount);
    expect(userAccount.account_id).toEqual('account1');
    expect(userAccount.user_id).toEqual('user1');
    expect(userAccount.is_owner).toBeFalsy();
    expect(userAccount.assigned_at).toEqual(parseISO('2023-02-14'));
    expect(userAccount.active).toBeTruthy();
  });
});
