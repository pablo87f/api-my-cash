import { OAuthInfo } from '../entities/o-auth-info';

export type VerifyTokenDto = {
  token: string;
};

export default interface IOAuthService {
  verifyToken(verifyTokenDto: VerifyTokenDto): Promise<OAuthInfo | undefined>;
}
