/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRecommendations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recommendationId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "_UserRecommendations" DROP CONSTRAINT "_UserRecommendations_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRecommendations" DROP CONSTRAINT "_UserRecommendations_B_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "seriesId",
ADD COLUMN     "recommendationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "Series";

-- DropTable
DROP TABLE "_UserRecommendations";

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "numberOfSeasons" INTEGER NOT NULL,
    "episodesPerSeason" INTEGER[],
    "rating" DOUBLE PRECISION NOT NULL,
    "numberOfRatings" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recommendation_category_idx" ON "Recommendation"("category");

-- CreateIndex
CREATE INDEX "Recommendation_service_idx" ON "Recommendation"("service");

-- CreateIndex
CREATE INDEX "Recommendation_rating_idx" ON "Recommendation"("rating");

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
