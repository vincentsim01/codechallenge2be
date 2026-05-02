/*
  Warnings:

  - The primary key for the `Thread` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Thread_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Thread_id_seq";
