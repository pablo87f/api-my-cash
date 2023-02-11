import IJwtService from '../IJwtService';

const jwtServiceMock: jest.Mocked<IJwtService> = {
  sign: jest.fn(),
};

export default jwtServiceMock;
