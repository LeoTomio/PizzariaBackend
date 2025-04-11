-- CreateEnum
CREATE TYPE "Method" AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "requestUrl" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "status" INTEGER NOT NULL,
    "entity" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
