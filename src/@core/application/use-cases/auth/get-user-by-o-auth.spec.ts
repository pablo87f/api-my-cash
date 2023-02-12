// import CreateCreditCard from './login-by-google';

import { UserOAuthInfo } from 'src/@core/domain/entities/user-o-auth-info';
import { OAuthInfo } from '../../../domain/entities/o-auth-info';
import { User } from '../../../domain/entities/user';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import GetUserByOAuth from './get-user-by-o-auth';

const makeSut = () => {
  const sut = new GetUserByOAuth(usersRepositoryMock, oAuthServiceMock);
  return sut;
};

beforeEach(() => {
  oAuthServiceMock.verifyToken.mockClear();
  usersRepositoryMock.findOne.mockClear();
});

describe('Get user by OAuth', () => {
  it('should get the user by email with oauth validated token info', async () => {
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

    const mockedOAuthToken = 'pablofern87@gmail.com|Pablo Fernandes|user1';

    // when
    const userOAuthInfo: UserOAuthInfo = await sut.execute({
      token: mockedOAuthToken,
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: mockedOAuthToken,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: 'pablofern87@gmail.com',
    });

    expect(userOAuthInfo.id).toEqual(mockedUser.id);
    expect(userOAuthInfo.name).toEqual(mockedUser.name);
    expect(userOAuthInfo.email).toEqual(mockedUser.email);
    expect(userOAuthInfo.picture).toEqual(mockedOAuthInfo.picture);
  });

  it('should return undefined when there is no user with the email from OAuth validated token info', async () => {
    // given
    const sut = makeSut();

    const mockedOAuthInfo = new OAuthInfo({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      picture: 'http://localhost:3000/pictures/pablo-fernandes.png',
    });

    oAuthServiceMock.verifyToken.mockResolvedValueOnce(mockedOAuthInfo);

    usersRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    const mockedOAuthToken = 'pablofern87@gmail.com|Pablo Fernandes|user1';

    // when
    const userOAuthInfo: UserOAuthInfo = await sut.execute({
      token: mockedOAuthToken,
    });

    // then
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledTimes(1);
    expect(oAuthServiceMock.verifyToken).toHaveBeenCalledWith({
      token: mockedOAuthToken,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: 'pablofern87@gmail.com',
    });

    expect(userOAuthInfo).toBeUndefined();
  });
});
