// import CreateCreditCard from './login-by-google';

import { AuthInfo } from '../../../domain/entities/auth-info';
import fakes from '../__mocks__/_fakes';
import loginByOAuthMock from '../__mocks__/login-by-o-auth.mock';
import signUpByOAuthMock from '../__mocks__/sign-up-by-o-auth.mock';
import SignInByOAuth from './sign-in-by-o-auth';

const makeSut = () => {
  const sut = new SignInByOAuth(loginByOAuthMock, signUpByOAuthMock);
  return sut;
};

beforeEach(() => {
  loginByOAuthMock.execute.mockClear();
  signUpByOAuthMock.execute.mockClear();
});

describe('Sign-in by OAuth', () => {
  it('should sign-in with existing user', async () => {
    // given
    const sut = makeSut();

    const emailKey = 'pablofern87@gmail.com';
    const fakeAuthInfo = fakes.entities.authInfo[emailKey];
    const fakeOAuthToken = fakes.constants.validOAuthToken;

    loginByOAuthMock.execute.mockResolvedValueOnce(fakeAuthInfo);

    // when
    const authInfo: AuthInfo = await sut.execute({
      token: fakeOAuthToken,
    });

    // then
    expect(loginByOAuthMock.execute).toHaveBeenCalledTimes(1);
    expect(loginByOAuthMock.execute).toHaveBeenCalledWith({
      token: fakeOAuthToken,
    });

    expect(authInfo.id).toEqual(fakeAuthInfo.id);
    expect(authInfo.name).toEqual(fakeAuthInfo.name);
    expect(authInfo.email).toEqual(fakeAuthInfo.email);
    expect(authInfo.picture).toEqual(fakeAuthInfo.picture);
    expect(authInfo.token).toEqual(fakeAuthInfo.token);
  });

  it('should sign-in with new user', async () => {
    // given
    const sut = makeSut();

    const emailKey = 'pablofern87@gmail.com';
    const fakeAuthInfo = fakes.entities.authInfo[emailKey];
    const fakeOAuthToken = fakes.constants.validOAuthToken;

    loginByOAuthMock.execute.mockResolvedValueOnce(undefined);
    signUpByOAuthMock.execute.mockResolvedValueOnce(fakeAuthInfo);

    // when
    const authInfo: AuthInfo = await sut.execute({
      token: fakeOAuthToken,
    });

    // then
    expect(loginByOAuthMock.execute).toHaveBeenCalledTimes(1);
    expect(loginByOAuthMock.execute).toHaveBeenCalledWith({
      token: fakeOAuthToken,
    });

    expect(signUpByOAuthMock.execute).toHaveBeenCalledTimes(1);
    expect(signUpByOAuthMock.execute).toHaveBeenCalledWith({
      token: fakeOAuthToken,
    });

    expect(authInfo.id).toEqual(fakeAuthInfo.id);
    expect(authInfo.name).toEqual(fakeAuthInfo.name);
    expect(authInfo.email).toEqual(fakeAuthInfo.email);
    expect(authInfo.picture).toEqual(fakeAuthInfo.picture);
    expect(authInfo.token).toEqual(fakeAuthInfo.token);
  });
});
