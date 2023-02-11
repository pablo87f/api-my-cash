// import CreateCreditCard from './login-by-google';

import { AuthInfo } from '../../../domain/entities/auth-info';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import { User } from '../../../domain/entities/user';
import LoginByOAuth from './login-by-o-auth';
import { OAuthInfo } from '../../../domain/entities/o-auth-info';

const makeSut = () => {
  const sut = new LoginByOAuth(usersRepositoryMock, oAuthServiceMock);
  return sut;
};

describe('Login by OAuth', () => {
  it('should login seccessfully with an existing user', async () => {
    const sut = makeSut();

    const oAuthInfo = new OAuthInfo({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      picture: 'http://localhost:3000/pictures/pablo-fernandes.png',
    });
    oAuthServiceMock.verifyToken.mockResolvedValueOnce(oAuthInfo);

    const user = new User({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      active: true,
      id: 'user1',
    });
    usersRepositoryMock.findOne.mockResolvedValueOnce(user);

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

    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.picture).toEqual(
      'http://localhost:3000/pictures/pablo-fernandes.png',
    );
  });
});
