import { AuthInfo } from '../../../domain/entities/auth-info';
import IUsersRepository from '../../../domain/repositories/IUsersRepository';
import IOAuthService from '../../../domain/services/IOAuthService';
import GetUserAuthInfo from './get-user-auth-info';

export type LoginByOAuthDto = {
  token: string;
};

export default class LoginByOAuth {
  constructor(
    readonly usersRepository: IUsersRepository,
    readonly oAuthService: IOAuthService,
    readonly getUserAuthInfo: GetUserAuthInfo,
  ) {}

  async execute({ token }: LoginByOAuthDto): Promise<AuthInfo> {
    const oAuthInfo = await this.oAuthService.verifyToken({ token });
    if (oAuthInfo) {
      const foundUser = await this.usersRepository.findOne({
        email: oAuthInfo.email,
      });

      const authInfo = await this.getUserAuthInfo.execute({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        picture: oAuthInfo.picture,
      });
      return authInfo;
    }
    return undefined;
  }
}
