/*
  Warnings:

  - Added the required column `credit_card_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "credit_card_id" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "creditcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
