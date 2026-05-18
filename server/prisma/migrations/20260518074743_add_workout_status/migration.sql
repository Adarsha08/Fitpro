-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "WorkoutAssignment" ADD COLUMN     "status" "WorkoutStatus" NOT NULL DEFAULT 'PENDING';
