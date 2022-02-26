/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_newsId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Media" (
    "url" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("url")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
