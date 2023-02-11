import IOAuthService from '../IOAuthService';

const oAuthServiceMock: jest.Mocked<IOAuthService> = {
  verifyToken: jest.fn(),
};

export default oAuthServiceMock;
