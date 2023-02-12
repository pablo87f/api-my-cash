import jwtServiceMock from '../../../domain/services/__mocks__/jwt-service.mock';
import GetUserAuthInfo from '../auth/get-user-auth-info';

const getUserAuthInfoMock: jest.Mocked<GetUserAuthInfo> = {
  execute: jest.fn(),
  jwtService: jwtServiceMock,
};

export default getUserAuthInfoMock;
