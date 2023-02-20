// import CreateCreditCard from './login-by-google';

import { AuthInfo } from '../../../domain/entities/auth-info';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import fakes from '../__mocks__/_fakes';
import getUserAuthInfoMock from '../__mocks__/get-user-auth-info.mock';
import LoginByOAuth from './login-by-o-auth';

const makeSut = () => {
  const sut = new LoginByOAuth(
    usersRepositoryMock,
    oAuthServiceMock,
    getUserAuthInfoMock,
  );
  return sut;
};

beforeEach(() => {
  oAuthServiceMock.verifyToken.mockClear();
  usersRepositoryMock.findOne.mockClear();
  getUserAuthInfoMock.execute.mockClear();
});

describe('Login by OAuth', () => {
  it('should login seccessfully with an existing user', async () => {
    // given
    const sut = makeSut();

    const emailKey = 'pablofern87@gmail.com';
    const fakeOAuthInfo = fakes.entities.oAuthInfo[emailKey];
    const fakeUser = fakes.entities.users[emailKey];
    const fakeJwtToken = fakes.constants.validJwtToken;
    const fakeAuthInfo = fakes.entities.authInfo[emailKey];
    const fakeOAuthToken = fakes.constants.validOAuthToken;

    oAuthServiceMock.verifyToken.mockResolvedValueOnce(fakeOAuthInfo);
    usersRepositoryMock.findOne.mockResolvedValueOnce(fakeUser);
    getUserAuthInfoMock.execute.mockResolvedValueOnce(fakeAuthInfo);

    // when
    const authInfo: AuthInfo = await sut.execute({
      token: fakeOAuthToken,
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: fakeOAuthToken,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: fakeUser.email,
    });

    expect(getUserAuthInfoMock.execute).toHaveBeenCalledTimes(1);
    expect(getUserAuthInfoMock.execute).toHaveBeenCalledWith({
      id: fakeUser.id,
      name: fakeUser.name,
      email: fakeUser.email,
      picture: fakeOAuthInfo.picture,
    });

    expect(authInfo.id).toEqual(fakeUser.id);
    expect(authInfo.name).toEqual(fakeUser.name);
    expect(authInfo.email).toEqual(fakeUser.email);
    expect(authInfo.picture).toEqual(fakeOAuthInfo.picture);
    expect(authInfo.token).toEqual(fakeJwtToken);
  });

  it('should return undefined if there is no user with the same email', async () => {
    // given
    const sut = makeSut();

    const emailKey = 'pablofern87@gmail.com';
    const fakeOAuthInfo = fakes.entities.oAuthInfo[emailKey];
    const fakeUser = fakes.entities.users[emailKey];
    const fakeAuthInfo = fakes.entities.authInfo[emailKey];
    const fakeOAuthToken = fakes.constants.validOAuthToken;

    oAuthServiceMock.verifyToken.mockResolvedValueOnce(fakeOAuthInfo);
    usersRepositoryMock.findOne.mockResolvedValueOnce(undefined);
    getUserAuthInfoMock.execute.mockResolvedValueOnce(fakeAuthInfo);

    // when
    const authInfo: AuthInfo = await sut.execute({
      token: fakeOAuthToken,
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: fakeOAuthToken,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: fakeUser.email,
    });

    expect(authInfo).toBeUndefined();
  });
});
