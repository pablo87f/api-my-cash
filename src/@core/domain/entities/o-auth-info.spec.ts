import { OAuthInfo } from './o-auth-info';

describe('Auth info', () => {
  it('should be defined', () => {
    const authInfo = new OAuthInfo({
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      picture: 'http://localhost:3000/pablo-picture.png',
    });

    expect(authInfo).toBeInstanceOf(OAuthInfo);
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.picture).toEqual('http://localhost:3000/pablo-picture.png');
  });
});
