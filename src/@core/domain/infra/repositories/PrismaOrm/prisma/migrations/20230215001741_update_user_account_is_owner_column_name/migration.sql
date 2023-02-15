/*
  Warnings:

  - You are about to drop the column `isOwner` on the `users_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL,
ALTER COLUMN "recurring_bill_id" SET DEFAULT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT NULL,
ALTER COLUMN "paid_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "users_accounts" DROP COLUMN "isOwner",
ADD COLUMN     "is_owner" BOOLEAN NOT NULL DEFAULT true;
