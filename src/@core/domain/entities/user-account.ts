export type UserAccountProps = {
  user_id: string;
  account_id: string;
  active?: boolean;
  assigned_at?: Date;
  is_owner?: boolean;
};

export class UserAccount {
  constructor(readonly props: UserAccountProps) {
    this.props = {
      ...props,
      active: props.active ?? true,
      is_owner: props.is_owner ?? false,
    };
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public get account_id(): string {
    return this.props.account_id;
  }

  public get is_owner(): boolean {
    return this.props.is_owner;
  }

  public get assigned_at(): Date {
    return this.props.assigned_at;
  }
  public get active(): boolean {
    return this.props.active;
  }
}
