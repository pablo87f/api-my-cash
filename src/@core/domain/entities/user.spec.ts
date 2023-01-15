import { User } from './user';

describe('User', () => {
  it('should be defined', () => {
    const user = new User({
      id: '1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toEqual('Pablo Fernandes');
    expect(user.email).toEqual('pablofern87@gmail.com');
    expect(user.active).toBeTruthy();
    expect(user.valid_email).toBeFalsy();
  });
});
