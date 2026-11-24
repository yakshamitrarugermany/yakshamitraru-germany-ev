-- AlterTable
ALTER TABLE "Event"
DROP COLUMN "endDate",
ADD COLUMN     "artists" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "organisedBy" TEXT,
ADD COLUMN     "yakshaganaTitle" TEXT;

ALTER TABLE "Event" ALTER COLUMN "startDate" TYPE DATE USING ("startDate" AT TIME ZONE 'Europe/Berlin')::date;
