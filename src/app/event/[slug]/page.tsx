import { notFound } from "next/navigation";
import GuestExperienceClient from "@/components/photobooth/guest-experience-client";
import { getGuestEvent } from "@/lib/guest-event";

export const dynamic = "force-dynamic";

const asset = (id: string, field: string, value: string | null) =>
  value && value.startsWith("data:") ? `/api/templates/${id}/preview?f=${field}&v=${value.length}` : value;

export default async function GuestEventPage({ params }: PageProps<"/event/[slug]">) {
  const { slug } = await params;
  const event = await getGuestEvent(slug);
  if (!event) notFound();
  const frames = event.frames.map((f) => ({
    ...f,
    background: asset(f.id, "background", f.background),
    overlay: asset(f.id, "overlay", f.overlay),
    logo: asset(f.id, "logo", f.logo),
  }));
  return <GuestExperienceClient {...event} frames={frames} initialStep="photobooth-start" />;
}
