import { AuthInfo } from '../../../domain/entities/auth-info';
import IOAuthService from '../../../domain/services/IOAuthService';
import CreateUser from '../user/create-user';
import GetUserAuthInfo from './get-user-auth-info';

export type SignUpByOAuthDto = {
  token: string;
};

export default class SignUpByOAuth {
  constructor(
    readonly oAuthService: IOAuthService,
    readonly createUser: CreateUser,
    readonly getUserAuthInfo: GetUserAuthInfo,
  ) {}

  async execute({ token }: SignUpByOAuthDto): Promise<AuthInfo> {
    const oAuthInfo = await this.oAuthService.verifyToken({ token });
    if (oAuthInfo) {
      const createdUserOutput = await this.createUser.execute({
        email: oAuthInfo.email,
        name: oAuthInfo.name,
      });

      const createdUser = createdUserOutput.createdUser;

      if (createdUser) {
        return await this.getUserAuthInfo.execute({
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          picture: oAuthInfo.picture,
        });
      }
    }
    return undefined;
  }
}
