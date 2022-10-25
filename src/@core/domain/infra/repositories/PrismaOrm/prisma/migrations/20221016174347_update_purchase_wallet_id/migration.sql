/*
  Warnings:

  - Added the required column `wallet_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "wallet_id" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
