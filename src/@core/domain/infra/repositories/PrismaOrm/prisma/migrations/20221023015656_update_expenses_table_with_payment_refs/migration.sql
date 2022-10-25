/*
  Warnings:

  - You are about to drop the column `recurring_expense_id` on the `expenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_recurring_expense_id_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "recurring_expense_id",
ADD COLUMN     "credit_card_id" VARCHAR(36),
ADD COLUMN     "recurring_bill_id" VARCHAR(36),
ADD COLUMN     "wallet_id" VARCHAR(36),
ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_recurring_bill_id_fkey" FOREIGN KEY ("recurring_bill_id") REFERENCES "recurring_bills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
