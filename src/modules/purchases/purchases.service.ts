import { Injectable } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import { ExpensesService } from '../expenses/expenses.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    private db: DbService,
    private expensesService: ExpensesService,
  ) {}

  async create({
    name,
    portions = 1,
    total_amount,
    due_date,
    user_id,
    payment_method,
  }: CreatePurchaseDto) {
    const expenses = this.expensesService.buildExpensesFromPurchase({
      due_date: new Date(due_date),
      portions,
      name,
      total_amount,
      user_id,
      payment_method,
    });

    const purchase = await this.db.purchase.create({
      data: {
        name,
        portions,
        total_amount,
        user_id,
        due_date,
        created_at: new Date(),
        payment_method,
        expenses: {
          create: expenses,
        },
      },
    });
    return purchase;
  }

  async findAll(user_id: string) {
    const purchases = await this.db.purchase.findMany({
      where: {
        user_id,
      },
      orderBy: {
        due_date: 'desc',
      },
    });
    return purchases;
  }

  async findOne(id: string) {
    return `This action returns a #${id} purchase`;
  }

  async update(
    id: string,
    {
      due_date,
      name,
      payment_method,
      portions,
      total_amount,
      user_id,
    }: UpdatePurchaseDto,
  ) {
    const purchaseExpenses = await this.expensesService.getAllByPurchase(id);
    const expenseIdsToDelete = purchaseExpenses.map(
      ({ id: expenseId }) => expenseId,
    );

    await this.db.expense.deleteMany({
      where: {
        id: { in: expenseIdsToDelete },
      },
    });

    const newExpenses = this.expensesService.buildExpensesFromPurchase({
      due_date: new Date(due_date),
      portions,
      name,
      total_amount,
      user_id,
      payment_method,
    });

    const purchase = await this.db.purchase.update({
      data: {
        due_date: new Date(due_date),
        id,
        name,
        payment_method,
        portions,
        total_amount,
        expenses: {
          create: newExpenses,
        },
      },
      where: {
        id,
      },
    });

    return purchase;
  }

  remove(id: string) {
    return `This action removes a #${id} purchase`;
  }
}
