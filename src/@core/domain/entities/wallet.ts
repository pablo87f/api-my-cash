export interface WalletProps {
  id?: string;
  name: string;
  amount: number;
  active?: boolean;
  user_id?: string;
}

export class Wallet {
  constructor(props: WalletProps) {
    this.props = props;
  }
  private props: WalletProps;

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