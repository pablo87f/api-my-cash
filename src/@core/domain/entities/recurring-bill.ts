import { Expense } from './expense';

export interface RecurringBillProps {
  id?: string;
  name: string;
  estimated_amount: number;
  due_date: Date;
  active?: boolean;
  created_at?: Date;
  user_id?: string;
  expenses?: Expense[];
}

export class RecurringBill {
  constructor(readonly props: RecurringBillProps) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get estimated_amount(): number {
    return this.props.estimated_amount;
  }

  public get due_date(): Date {
    return this.props.due_date;
  }

  public get active(): boolean {
    return this.props.active;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public get expenses(): Expense[] {
    return this.props.expenses;
  }
}
