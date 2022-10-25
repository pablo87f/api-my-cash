-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_credit_card_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_wallet_id_fkey";

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "purchases" ALTER COLUMN "wallet_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
