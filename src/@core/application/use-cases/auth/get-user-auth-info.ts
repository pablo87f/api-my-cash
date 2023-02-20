import IJwtService from '../../../domain/services/IJwtService';
import { AuthInfo } from '../../../domain/entities/auth-info';

export type GetUserAuthInfoDto = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  account_id?: string;
};

export default class GetUserAuthInfo {
  constructor(readonly jwtService: IJwtService) {}

  async execute({
    id,
    name,
    email,
    picture,
    account_id,
  }: GetUserAuthInfoDto): Promise<AuthInfo> {
    const jwtToken = await this.jwtService.sign({
      id,
      name,
      email,
      picture,
      account_id,
    });

    return new AuthInfo({
      id,
      name,
      email,
      picture,
      account_id,
      token: jwtToken,
    });
  }
}
