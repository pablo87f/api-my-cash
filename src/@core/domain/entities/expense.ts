import { randomUUID } from 'crypto';

export interface ExpenseProps {
  id?: string;
  name: string;
  amount: number;
  due_date: Date;
  // paid?: boolean;
  active?: boolean;
  created_at?: Date;
  user_id?: string;
  purchase_id?: string;
  recurring_bill_id?: string;
}

export class Expense {
  constructor(props: ExpenseProps) {
    this.props = props.id ? props : { ...props, id: randomUUID() };
  }
  private props: ExpenseProps;

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
}
