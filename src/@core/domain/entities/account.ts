import { randomUUID } from 'crypto';

export type AccountProps = {
  id?: string;
  name: string;
  users_ids: string[];
  active?: boolean;
  created_at?: Date;
};

export class Account {
  constructor(readonly props: AccountProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      active: props.active ?? true,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get users_ids(): string[] {
    return this.props.users_ids;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
