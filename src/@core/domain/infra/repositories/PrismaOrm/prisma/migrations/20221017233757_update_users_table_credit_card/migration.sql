/*
  Warnings:

  - You are about to drop the `creditcards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "creditcards" DROP CONSTRAINT "creditcards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_credit_card_id_fkey";

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- DropTable
DROP TABLE "creditcards";

-- CreateTable
CREATE TABLE "credit_cards" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "spent_amount" REAL NOT NULL,
    "total_limit" REAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "credit_cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
