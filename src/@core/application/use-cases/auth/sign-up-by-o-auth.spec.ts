import { AuthInfo } from '../../../domain/entities/auth-info';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import createUserMock from '../__mocks__/create-user.mock';
import getUserAuthInfoMock from '../__mocks__/get-user-auth-info.mock';
import fakes from '../__mocks__/_fakes';
import SignUpByOAuth from './sign-up-by-o-auth';

const makeSut = () => {
  const sut = new SignUpByOAuth(
    oAuthServiceMock,
    createUserMock,
    getUserAuthInfoMock,
  );
  return sut;
};

beforeEach(() => {
  oAuthServiceMock.verifyToken.mockClear();
  createUserMock.execute.mockClear();
  getUserAuthInfoMock.execute.mockClear();
});

describe('Sign up by OAuth', () => {
  it('should sign up when there is no user with the same email', async () => {
    // given
    const sut = makeSut();

    const pabloUserEmail = 'pablofern87@gmail.com';
    const fakeOAuthInfo = fakes.entities.oAuthInfo[pabloUserEmail];
    const fakeCreatedUser = fakes.entities.users[pabloUserEmail];
    const fakeJwtToken = fakes.constants.validJwtToken;
    const fakeAuthInfo = fakes.entities.authInfo[pabloUserEmail];
    const fakeOAuthToken = fakes.constants.validOAuthToken;

    oAuthServiceMock.verifyToken.mockResolvedValueOnce(fakeOAuthInfo);
    createUserMock.execute.mockResolvedValueOnce(fakeCreatedUser);
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

    expect(createUserMock.execute).toHaveBeenCalledTimes(1);
    expect(createUserMock.execute).toHaveBeenCalledWith({
      email: fakeOAuthInfo.email,
      name: fakeOAuthInfo.name,
    });

    expect(getUserAuthInfoMock.execute).toHaveBeenCalledTimes(1);
    expect(getUserAuthInfoMock.execute).toHaveBeenCalledWith({
      id: fakeCreatedUser.id,
      name: fakeCreatedUser.name,
      email: fakeCreatedUser.email,
      picture: fakeOAuthInfo.picture,
    });

    expect(authInfo.id).toEqual(fakeCreatedUser.id);
    expect(authInfo.name).toEqual(fakeCreatedUser.name);
    expect(authInfo.email).toEqual(fakeCreatedUser.email);
    expect(authInfo.picture).toEqual(fakeOAuthInfo.picture);
    expect(authInfo.token).toEqual(fakeJwtToken);
  });

  it('should return undefined when the oAuth token is invalid', async () => {
    // given
    const fakeInvalidOAuthToken = 'fake-invalid-token';

    oAuthServiceMock.verifyToken.mockResolvedValueOnce(undefined);

    // when
    const sut = makeSut();
    const authInfo: AuthInfo = await sut.execute({
      token: fakeInvalidOAuthToken,
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: fakeInvalidOAuthToken,
    });

    expect(authInfo).toBeUndefined();
  });
});
