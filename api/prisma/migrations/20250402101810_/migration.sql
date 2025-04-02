/*
  Warnings:

  - You are about to drop the `ItemCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ItemCategory";

-- CreateIndex
CREATE INDEX "Item_categoryId_idx" ON "Item"("categoryId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
