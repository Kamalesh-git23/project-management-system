/*
  Warnings:

  - Added the required column `teamMembers` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "teamMembers" TEXT NOT NULL,
ALTER COLUMN "projectMode" SET DEFAULT 'MY_PROJECT';
