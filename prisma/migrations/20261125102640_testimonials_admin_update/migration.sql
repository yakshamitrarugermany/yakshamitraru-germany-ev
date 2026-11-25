/*
  Warnings:

  - You are about to drop the column `displayNameMode` on the `Testimonial` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Testimonial_status_createdAt_idx";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "displayNameMode",
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill existing APPROVED rows with sortOrder 1..n in createdAt ascending order
UPDATE "Testimonial" AS t
SET "sortOrder" = ranked.rn
FROM (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" ASC, "id" ASC) AS rn
  FROM "Testimonial"
  WHERE "status" = 'APPROVED'
) AS ranked
WHERE t."id" = ranked."id";

-- DropEnum
DROP TYPE "DisplayNameMode";

-- CreateIndex
CREATE INDEX "Testimonial_status_sortOrder_idx" ON "Testimonial"("status", "sortOrder");
