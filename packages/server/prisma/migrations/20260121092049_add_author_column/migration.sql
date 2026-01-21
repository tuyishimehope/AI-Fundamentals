/*
  Warnings:

  - Added the required column `author` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `author` VARCHAR(100) NOT NULL;
