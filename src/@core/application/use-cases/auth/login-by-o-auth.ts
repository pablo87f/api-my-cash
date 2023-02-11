import { AuthInfo } from '../../../domain/entities/auth-info';
import IUsersRepository from '../../../domain/repositories/IUsersRepository';
import IOAuthService from '../../../domain/services/IOAuthService';

export type LoginByOAuthDto = {
  token: string;
};

export default class LoginByOAuth {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly oAuthService: IOAuthService,
  ) {}

  async execute({ token }: LoginByOAuthDto): Promise<AuthInfo> {
    const oAuthInfo = await this.oAuthService.verifyToken({ token });
    if (oAuthInfo) {
      const foundUser = await this.usersRepository.findOne({
        email: oAuthInfo.email,
      });

      return new AuthInfo({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        picture: oAuthInfo.picture,
      });
    }
    return undefined;
  }
}
