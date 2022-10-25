import { randomUUID } from 'crypto';

export interface ExpenseProps {
  id?: string;
  name: string;
  amount: number;
  due_date: Date;
  active?: boolean;
  created_at?: Date;
  user_id?: string;
  purchase_id?: string;
  recurring_bill_id?: string;
  wallet_id?: string;
  credit_card_id?: string;
  paid_at?: Date;
}

export class Expense {
  constructor(readonly props: ExpenseProps) {
    this.props = props.id ? props : { ...props, id: randomUUID() };
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

  public get due_date(): Date {
    return this.props.due_date;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public get purchase_id(): string {
    return this.props.purchase_id;
  }

  public get recurring_bill_id(): string {
    return this.props.recurring_bill_id;
  }

  public get wallet_id(): string {
    return this.props.wallet_id;
  }

  public get credit_card_id(): string {
    return this.props.credit_card_id;
  }

  public get paid_at(): Date {
    return this.props.paid_at;
  }
}
