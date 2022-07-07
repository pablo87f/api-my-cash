-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DEBIT', 'CREDIT');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "auth_id" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "purchase_id" VARCHAR(36) DEFAULT NULL,
    "recurring_expense_id" VARCHAR(36),

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "total_amount" REAL NOT NULL,
    "portions" SMALLINT NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'DEBIT',
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurring_expenses" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "estimated_amount" REAL NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "recurring_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_recurring_expense_id_fkey" FOREIGN KEY ("recurring_expense_id") REFERENCES "recurring_expenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_expenses" ADD CONSTRAINT "recurring_expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
