// import CreateCreditCard from './login-by-google';

import { AuthInfo } from '../../../domain/entities/auth-info';
import jwtServiceMock from '../../../domain/services/__mocks__/jwt-service.mock';
import fakes from '../__fakes__/fakes';
import GetUserAuthInfo from './get-user-auth-info';

const makeSut = () => {
  const sut = new GetUserAuthInfo(jwtServiceMock);
  return sut;
};

describe('Get user auth info', () => {
  it('should get the auth info with the token when pass the id, email, name and picture', async () => {
    // given
    const sut = makeSut();

    const fakeJwtToken = fakes.constants.validJwtToken;

    jwtServiceMock.sign.mockReturnValueOnce(fakeJwtToken);

    // when
    const authInfo: AuthInfo = await sut.execute({
      id: 'user1',
      name: 'Pablo Fernandes',
      email: 'pablofern87@gmail.com',
      picture: 'http:localhost:3000/pictures/pablo-fernandes.png',
    });

    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      email: 'pablofern87@gmail.com',
      name: 'Pablo Fernandes',
      id: 'user1',
      picture: 'http:localhost:3000/pictures/pablo-fernandes.png',
    });

    expect(authInfo).toBeInstanceOf(AuthInfo);
    expect(authInfo.id).toEqual('user1');
    expect(authInfo.name).toEqual('Pablo Fernandes');
    expect(authInfo.email).toEqual('pablofern87@gmail.com');
    expect(authInfo.picture).toEqual(
      'http:localhost:3000/pictures/pablo-fernandes.png',
    );
    expect(authInfo.token).toEqual(fakeJwtToken);
  });
});
