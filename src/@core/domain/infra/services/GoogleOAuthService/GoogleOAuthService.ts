import { OAuthInfo } from 'src/@core/domain/entities/o-auth-info';

import IOAuthService, {
  VerifyTokenDto,
} from 'src/@core/domain/services/IOAuthService';

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
);

export default class GoogleOAuthService implements IOAuthService {
  async verifyToken({ token }: VerifyTokenDto): Promise<OAuthInfo> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return new OAuthInfo({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
  }
}
