import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mergeInvitationContent } from "@/lib/invitation-content";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.trim().toLowerCase() || "putri-mahfud";
  const event = await prisma.event.findUnique({ where: { slug }, include: { invitation: true } });
  if (!event || !event.active) return NextResponse.json({ error: "Undangan tidak ditemukan." }, { status: 404 });
  return NextResponse.json({ event: { name: event.name, date: event.date, location: event.location }, invitation: mergeInvitationContent(event.invitation?.data) });
}
