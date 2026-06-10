/*
  Warnings:

  - Added the required column `pembicara_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "pembicara" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bidang" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembicara_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "pembicara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
