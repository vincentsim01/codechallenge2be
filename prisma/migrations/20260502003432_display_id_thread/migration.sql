/*
  Warnings:

  - A unique constraint covering the columns `[displayId]` on the table `Thread` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "displayId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Thread_displayId_key" ON "Thread"("displayId");
