import { randomUUID } from 'crypto';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  active?: boolean;
  email_confirmed?: boolean;
  created_at?: Date;
};

export class User {
  constructor(readonly props: UserProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      active: props.active ?? true,
      email_confirmed: props.email_confirmed ?? false,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get email_confirmed(): boolean {
    return this.props.email_confirmed;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
