export interface CreditCardProps {
  id?: string;
  name: string;
  total_limit: number;
  spent_amount?: number;
  active?: boolean;
  user_id?: string;
}

export class CreditCard {
  constructor(props: CreditCardProps) {
    this.props = props;
  }
  private props: CreditCardProps;

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get spent_amount(): number {
    return this.props.spent_amount;
  }

  public get total_limit(): number {
    return this.props.total_limit;
  }

  public get remaining_limit(): number {
    return this.props.total_limit - this.props.spent_amount;
  }
  public get user_id(): string {
    return this.props.user_id;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
