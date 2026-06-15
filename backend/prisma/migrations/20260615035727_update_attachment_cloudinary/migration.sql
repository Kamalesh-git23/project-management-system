/*
  Warnings:

  - You are about to drop the column `filePath` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "filePath",
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL;
