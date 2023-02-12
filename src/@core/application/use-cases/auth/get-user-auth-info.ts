import IJwtService from '../../../domain/services/IJwtService';
import { AuthInfo } from '../../../domain/entities/auth-info';

export type GetUserAuthInfoDto = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

export default class GetUserAuthInfo {
  constructor(readonly jwtService: IJwtService) {}

  async execute({
    id,
    name,
    email,
    picture,
  }: GetUserAuthInfoDto): Promise<AuthInfo> {
    if (id && name && email) {
      const jwtToken = await this.jwtService.sign({
        id,
        name,
        email,
        picture,
      });

      return new AuthInfo({
        id,
        name,
        email,
        picture,
        token: jwtToken,
      });
    }

    return undefined;
  }
}
