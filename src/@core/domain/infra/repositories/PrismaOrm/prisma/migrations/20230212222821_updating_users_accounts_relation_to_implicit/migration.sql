/*
  Warnings:

  - You are about to drop the `users_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_accounts" DROP CONSTRAINT "users_accounts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "users_accounts" DROP CONSTRAINT "users_accounts_user_id_fkey";

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL,
ALTER COLUMN "recurring_bill_id" SET DEFAULT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT NULL,
ALTER COLUMN "paid_at" SET DEFAULT NULL;

-- DropTable
DROP TABLE "users_accounts";

-- CreateTable
CREATE TABLE "_AccountToUser" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToUser_AB_unique" ON "_AccountToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToUser_B_index" ON "_AccountToUser"("B");

-- AddForeignKey
ALTER TABLE "_AccountToUser" ADD CONSTRAINT "_AccountToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToUser" ADD CONSTRAINT "_AccountToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
