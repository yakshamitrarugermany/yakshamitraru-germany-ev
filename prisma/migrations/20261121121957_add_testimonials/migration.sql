-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DisplayNameMode" AS ENUM ('FULL', 'FIRST');

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayNameMode" "DisplayNameMode" NOT NULL DEFAULT 'FIRST',
    "email" TEXT NOT NULL,
    "role" TEXT,
    "event" TEXT,
    "city" TEXT,
    "text" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "status" "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimonial_status_createdAt_idx" ON "Testimonial"("status", "createdAt");
