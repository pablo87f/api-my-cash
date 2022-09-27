import { randomUUID } from 'crypto';
import { Expense } from './expense';

export type PaymentMethod = 'CREDIT' | 'DEBIT';

export interface PurchaseProps {
  id?: string;
  name: string;
  total_amount: number;
  due_date: Date;
  portions?: number;
  payment_method: PaymentMethod;
  active?: boolean;
  created_at?: Date;
  user_id?: string;
  expenses?: Expense[];
  payment_source_id?: string;
}

export class Purchase {
  constructor(readonly props: PurchaseProps) {
    this.props = { ...props, id: props.id || randomUUID() };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get total_amount(): number {
    return this.props.total_amount;
  }

  public get portions(): number {
    return this.props.portions;
  }

  public get payment_method(): PaymentMethod {
    return this.props.payment_method;
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

  public get payment_source_id(): string {
    return this.props.payment_source_id;
  }
}
