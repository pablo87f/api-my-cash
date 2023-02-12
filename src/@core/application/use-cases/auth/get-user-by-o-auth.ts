import { UserOAuthInfo } from '../../../domain/entities/user-o-auth-info';
import IUsersRepository from '../../../domain/repositories/IUsersRepository';
import IOAuthService from '../../../domain/services/IOAuthService';

export type GetUserByOAuthDto = {
  token: string;
};

export default class GetUserByOAuth {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly oAuthService: IOAuthService,
  ) {}

  async execute({ token }: GetUserByOAuthDto): Promise<UserOAuthInfo> {
    const oAuthInfo = await this.oAuthService.verifyToken({ token });
    if (oAuthInfo) {
      const foundUser = await this.usersRepository.findOne({
        email: oAuthInfo.email,
      });
      if (foundUser) {
        return new UserOAuthInfo({
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          picture: oAuthInfo.picture,
        });
      }
    }
    return undefined;
  }
}
