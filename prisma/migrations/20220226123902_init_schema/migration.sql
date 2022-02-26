-- CreateEnum
CREATE TYPE "ScraperSource" AS ENUM ('TWITTER');

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScraperLookup" (
    "source" "ScraperSource" NOT NULL,
    "lastLookup" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScraperLookup_pkey" PRIMARY KEY ("source")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
