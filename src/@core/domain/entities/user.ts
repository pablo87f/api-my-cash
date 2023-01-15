import { randomUUID } from 'crypto';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  active?: boolean;
  valid_email?: boolean;
  created_at?: Date;
};

export class User {
  constructor(readonly props: UserProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      active: props.active ?? true,
      valid_email: props.valid_email ?? false,
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

  public get valid_email(): boolean {
    return this.props.valid_email;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
