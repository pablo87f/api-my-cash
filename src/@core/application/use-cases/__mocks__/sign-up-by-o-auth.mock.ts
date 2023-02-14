import oAuthServiceMock from '../../../domain/services/__mocks__/o-auth-service.mock';
import SignUpByOAuth from '../auth/sign-up-by-o-auth';
import createUserMock from './create-user.mock';
import getUserAuthInfoMock from './get-user-auth-info.mock';

const signUpByOAuthMock: jest.Mocked<SignUpByOAuth> = {
  execute: jest.fn(),
  createUser: createUserMock,
  getUserAuthInfo: getUserAuthInfoMock,
  oAuthService: oAuthServiceMock,
};

export default signUpByOAuthMock;
