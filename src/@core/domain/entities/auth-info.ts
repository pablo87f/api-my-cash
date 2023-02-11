export type AuthInfoProps = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  token?: string;
  refreshToken?: string;
};

export class AuthInfo {
  constructor(readonly props: AuthInfoProps) {}

  public get id(): string {
    return this.props.id;
  }
  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get picture(): string | undefined {
    return this.props.picture;
  }

  public get token(): string | undefined {
    return this.props.token;
  }

  public get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }
}
