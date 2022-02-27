/*
  Warnings:

  - Added the required column `mediaType` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "mediaType" "MediaType" NOT NULL;
