/*
  Warnings:

  - You are about to drop the column `paid` on the `expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "paid",
ADD COLUMN     "paid_at" TIMESTAMP(3) DEFAULT NULL,
ALTER COLUMN "purchase_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL,
ALTER COLUMN "recurring_bill_id" SET DEFAULT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT NULL;
