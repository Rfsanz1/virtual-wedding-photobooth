CREATE TABLE "InvitationContent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "InvitationContent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "InvitationContent_eventId_key" ON "InvitationContent"("eventId");

ALTER TABLE "InvitationContent"
ADD CONSTRAINT "InvitationContent_eventId_fkey"
FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
