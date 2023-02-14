import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import LoginByOAuth from '../auth/login-by-o-auth';
import getUserAuthInfoMock from './get-user-auth-info.mock';

const loginByOAuthMock: jest.Mocked<LoginByOAuth> = {
  execute: jest.fn(),
  getUserAuthInfo: getUserAuthInfoMock,
  oAuthService: oAuthServiceMock,
  usersRepository: usersRepositoryMock,
};

export default loginByOAuthMock;
