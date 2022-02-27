/*
  Warnings:

  - The primary key for the `Media` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Media" DROP CONSTRAINT "Media_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Media_pkey" PRIMARY KEY ("id");
