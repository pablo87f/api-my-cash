/*
  Warnings:

  - You are about to drop the `UsersOnAccounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnAccounts" DROP CONSTRAINT "UsersOnAccounts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnAccounts" DROP CONSTRAINT "UsersOnAccounts_user_id_fkey";

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL,
ALTER COLUMN "recurring_bill_id" SET DEFAULT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT NULL,
ALTER COLUMN "paid_at" SET DEFAULT NULL;

-- DropTable
DROP TABLE "UsersOnAccounts";

-- CreateTable
CREATE TABLE "users_accounts" (
    "user_id" VARCHAR(36) NOT NULL,
    "account_id" VARCHAR(36) NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isOwner" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_accounts_pkey" PRIMARY KEY ("user_id","account_id")
);

-- AddForeignKey
ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
