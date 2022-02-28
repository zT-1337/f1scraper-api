-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('READ', 'UNREAD', 'BOOKMARKED');

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "newsStatus" "NewsStatus" NOT NULL DEFAULT E'UNREAD';
