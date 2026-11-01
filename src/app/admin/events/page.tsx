/* Event cover images are administrator-configured URLs. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CalendarDays, ExternalLink, Heart, MapPin, Plus, Settings2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { storage } from "@/lib/storage/storage";

export default async function EventsPage() {
  await requireAdmin();
  const events = await prisma.event.findMany({
    orderBy: [{ active: "desc" }, { date: "desc" }],
    include: { _count: { select: { photos: true, videos: true, voiceNotes: true, messages: true } } },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-7 sm:px-8 lg:py-10">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#a77943]">{events.length} event</p>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-[#302b28] sm:text-4xl">Daftar Event</h1>
        </div>
        <Link href="/admin/events/new" className="inline-flex items-center gap-2 rounded-full bg-[#302b28] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a423d]">
          <Plus size={16} /> Event baru
        </Link>
      </header>

      {events.length === 0 ? (
        <div className="mt-7 rounded-3xl border border-[#eadfd5] bg-[#fffdfa] p-10 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f5eadb] text-[#a77943]"><Heart size={20} /></span>
          <h2 className="mt-4 font-serif text-2xl">Belum ada event</h2>
          <p className="mt-1 text-sm text-[#8e837b]">Mulai dengan membuat event pertamamu.</p>
          <Link href="/admin/events/new" className="mt-5 inline-block rounded-xl bg-[#302b28] px-4 py-3 text-sm font-semibold text-white">Buat event</Link>
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const counts = [
              { label: "Foto", value: event._count.photos },
              { label: "Video", value: event._count.videos },
              { label: "Voice", value: event._count.voiceNotes },
              { label: "Ucapan", value: event._count.messages },
            ];
            return (
              <article key={event.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#eadfd5] bg-[#fffdfa] shadow-[0_10px_30px_rgba(100,76,54,0.05)]">
                <Link href={`/admin/events/${event.id}`} className="block">
                  <div className="relative aspect-[16/7] w-full bg-[#f0e2d4]">
                    {event.coverImage ? (
                      <img src={storage.getFileUrl(event.coverImage)} alt={`Cover ${event.name}`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#fffaf3,#ead8c5)]"><Heart size={30} className="text-[#bd9870]" /></div>
                    )}
                    <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${event.active ? "bg-[#eaf5ed]/95 text-[#4c8a5a]" : "bg-white/90 text-[#8e837b]"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${event.active ? "bg-[#5ea66a]" : "bg-[#b9aaa0]"}`} />
                      {event.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div className="px-5 pt-4">
                    <h2 className="truncate font-serif text-xl text-[#302b28]">{event.name}</h2>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8e837b]">
                      <span className="inline-flex items-center gap-1"><CalendarDays size={13} /> {event.date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                      {event.location && <span className="inline-flex min-w-0 items-center gap-1"><MapPin size={13} className="shrink-0" /> <span className="truncate">{event.location}</span></span>}
                    </p>
                    <dl className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-[#faf3eb] px-3 py-2.5 text-center">
                      {counts.map(({ label, value }) => (
                        <div key={label}>
                          <dd className="font-serif text-lg leading-tight text-[#302b28]">{value}</dd>
                          <dt className="text-[10px] font-medium uppercase tracking-wider text-[#a59689]">{label}</dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Link>
                <div className="mt-auto grid grid-cols-2 gap-2.5 p-5 pt-4">
                  <Link href={`/admin/events/${event.id}`} className="flex items-center justify-center gap-2 rounded-xl bg-[#b99261] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a98350]"><Settings2 size={15} /> Kelola</Link>
                  <Link href={`/event/${event.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-[#eadfd5] px-4 py-2.5 text-sm font-semibold text-[#645a53] transition hover:bg-[#faf3eb]"><ExternalLink size={15} /> Lihat tamu</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
