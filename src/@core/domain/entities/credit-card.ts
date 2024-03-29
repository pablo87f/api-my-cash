import { randomUUID } from 'crypto';

export interface CreditCardProps {
  id?: string;
  name: string;
  total_limit: number;
  spent_amount?: number;
  active?: boolean;
  user_id?: string;
}

export class CreditCard {
  constructor(readonly props: CreditCardProps) {
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

  public get spent_amount(): number {
    return this.props.spent_amount ?? 0;
  }

  public get total_limit(): number {
    return this.props.total_limit;
  }

  public get remaining_limit(): number {
    return this.total_limit - this.spent_amount;
  }
  public get user_id(): string {
    return this.props.user_id;
  }

  public get active(): boolean {
    return this.props.active;
  }
}
