export type BuildExpenseFromPruchaseDto = {
  name: string;
  portions: number;
  total_amount: number;
  due_date: Date;
  user_id: string;
  payment_method: 'DEBIT' | 'CREDIT';
};
