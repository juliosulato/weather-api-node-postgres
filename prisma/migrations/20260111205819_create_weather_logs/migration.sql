-- CreateTable
CREATE TABLE "weather_logs" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "rawResponse" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weather_logs_pkey" PRIMARY KEY ("id")
);
