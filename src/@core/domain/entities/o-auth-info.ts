export type OAuthInfoProps = {
  name: string;
  email: string;
  picture?: string;
};

export class OAuthInfo {
  constructor(readonly props: OAuthInfoProps) {}

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get picture(): string | undefined {
    return this.props.picture;
  }
}
