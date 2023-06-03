-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "category" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '';
