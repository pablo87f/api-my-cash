-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "purchase_id" SET DEFAULT NULL;

-- CreateTable
CREATE TABLE "creditcards" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "spent_amount" REAL NOT NULL,
    "total_limit" REAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "creditcards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "creditcards" ADD CONSTRAINT "creditcards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
