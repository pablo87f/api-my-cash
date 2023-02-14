import { AuthInfo } from '../../../domain/entities/auth-info';
import LoginByOAuth from './login-by-o-auth';
import SignUpByOAuth from './sign-up-by-o-auth';

export type SignInByOAuthDto = {
  token: string;
};

export default class SignInByOAuth {
  constructor(
    readonly loginByOAuth: LoginByOAuth,
    readonly signUpByOAuth: SignUpByOAuth,
  ) {}

  async execute({ token }: SignInByOAuthDto): Promise<AuthInfo> {
    const loginAuthInfo = await this.loginByOAuth.execute({
      token,
    });

    if (loginAuthInfo) {
      return loginAuthInfo;
    }

    const signUpAuthInfo = await this.signUpByOAuth.execute({ token });
    return signUpAuthInfo;
  }
}
