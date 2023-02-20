-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "account_id" VARCHAR(36),
ALTER COLUMN "purchase_id" SET DEFAULT NULL,
ALTER COLUMN "credit_card_id" SET DEFAULT NULL,
ALTER COLUMN "recurring_bill_id" SET DEFAULT NULL,
ALTER COLUMN "wallet_id" SET DEFAULT NULL,
ALTER COLUMN "paid_at" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "account_id" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
