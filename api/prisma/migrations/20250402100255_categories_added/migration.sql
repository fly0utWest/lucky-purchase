-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCategory" (
    "itemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ItemCategory_pkey" PRIMARY KEY ("itemId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "ItemCategory_itemId_idx" ON "ItemCategory"("itemId");

-- CreateIndex
CREATE INDEX "ItemCategory_categoryId_idx" ON "ItemCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
