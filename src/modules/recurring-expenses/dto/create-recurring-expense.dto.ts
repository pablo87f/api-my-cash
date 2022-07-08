export class CreateRecurringExpenseDto {
  name: string;
  estimated_amount: number;
  due_date: Date;
  user_id: string;
}
