import { randomUUID } from 'crypto';

export type WalletProps = {
  id?: string;
  name: string;
  amount: number;
  active?: boolean;
  user_id?: string;
};

export class Wallet {
  constructor(readonly props: WalletProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      active: props.active ?? true,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
