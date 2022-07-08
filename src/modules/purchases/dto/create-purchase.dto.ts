export class CreatePurchaseDto {
  name: string;
  portions: number;
  total_amount: number;
  due_date: Date;
  payment_method: 'DEBIT' | 'CREDIT';
  user_id: string;
}
