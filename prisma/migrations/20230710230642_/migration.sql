-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "dueDate" DROP DEFAULT,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT;
