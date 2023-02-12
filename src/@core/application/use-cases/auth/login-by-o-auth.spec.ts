// import CreateCreditCard from './login-by-google';

import { AuthInfo } from '../../../domain/entities/auth-info';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import { User } from '../../../domain/entities/user';
import LoginByOAuth from './login-by-o-auth';
import { OAuthInfo } from '../../../domain/entities/o-auth-info';
import jwtServiceMock from '../../../domain/services/__mocks__/jwt-service.mock';

const makeSut = () => {
  const sut = new LoginByOAuth(
    usersRepositoryMock,
    oAuthServiceMock,
    jwtServiceMock,
  );
  return sut;
};

describe('Login by OAuth', () => {
  it('should login seccessfully with an existing user', async () => {
    // given
    const sut = makeSut();

    const mockedOAuthInfo = new OAuthInfo({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      picture: 'http://localhost:3000/pictures/pablo-fernandes.png',
    });
    oAuthServiceMock.verifyToken.mockResolvedValueOnce(mockedOAuthInfo);

    const mockedUser = new User({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      active: true,
      id: 'user1',
    });
    usersRepositoryMock.findOne.mockResolvedValueOnce(mockedUser);

    const mockedToken = 'some random token string';
    jwtServiceMock.sign.mockReturnValueOnce(mockedToken);

    // when
    const authInfo: AuthInfo = await sut.execute({
      token: 'pablofern87@gmail.com|Pablo Fernandes|user1',
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: 'pablofern87@gmail.com|Pablo Fernandes|user1',
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: 'pablofern87@gmail.com',
    });

    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      id: 'user1',
    });

    expect(authInfo.id).toEqual(mockedUser.id);
    expect(authInfo.name).toEqual(mockedUser.name);
    expect(authInfo.email).toEqual(mockedUser.email);
    expect(authInfo.picture).toEqual(mockedOAuthInfo.picture);
    expect(authInfo.token).toEqual(mockedToken);
  });
});
