import { AuthInfo } from './auth-info';

describe('Auth info', () => {
  it('should be defined', () => {
    const authInfo = new AuthInfo({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
  });

  it('should be defined with picuture', () => {
    const authInfo = new AuthInfo({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      picture: 'http://localhost:3000/pablo-picture.png',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.picture).toEqual('http://localhost:3000/pablo-picture.png');
  });

  it('should be defined with token', () => {
    const authInfo = new AuthInfo({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      token: 'some random token string',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.token).toEqual('some random token string');
  });

  it('should be defined with account_id', () => {
    const authInfo = new AuthInfo({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      account_id: 'account1',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.account_id).toEqual('account1');
  });

  it('should be defined with refreshToken', () => {
    const authInfo = new AuthInfo({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      refreshToken: 'some random token string',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.refreshToken).toEqual('some random token string');
  });
});
