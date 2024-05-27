-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "hours" TEXT,
ADD COLUMN     "isUpcoming" BOOLEAN DEFAULT false,
ADD COLUMN     "minutes" TEXT,
ADD COLUMN     "priority" TEXT;
