"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";

export function Corners() {
  const c = (name: string, cls: string) => <img key={name} src={`/references/choice-${name}.webp`} alt="" aria-hidden="true" draggable={false} className={`pointer-events-none absolute h-auto select-none ${cls}`} />;
  return (
    <>
      {c("tl", "left-0 top-0 w-[42vw] max-w-[380px]")}
      {c("tr", "right-0 top-0 w-[30vw] max-w-[280px]")}
      {c("bl", "bottom-0 left-0 w-[30vw] max-w-[260px]")}
      {c("br", "bottom-0 right-0 w-[38vw] max-w-[320px]")}
    </>
  );
}

export function Rings() {
  return (
    <svg viewBox="0 0 80 56" className="h-8 w-12" fill="none" stroke="#b98b4f" strokeWidth="2.5">
      <circle cx="30" cy="34" r="16" /><circle cx="50" cy="34" r="16" /><path d="M34 12l6-8 6 8-6 6z" />
    </svg>
  );
}

export function GuestHeader() {
  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-[#b98b4f]/50 sm:w-28" /><Rings /><span className="h-px w-14 bg-[#b98b4f]/50 sm:w-28" />
      </div>
      <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.34em] text-[#1c3359] sm:text-xs">Wedding Photobooth</p>
    </div>
  );
}

export function Stepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Langkah ${current} dari 3`}>
      {[1, 2, 3].map((n, i) => (
        <Fragment key={n}>
          {i > 0 && <span className="h-px flex-1 bg-[#b98b4f]/55" />}
          <span className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold ${n === current ? "border-[#1c3359] bg-[#1c3359] text-white shadow-sm" : n < current ? "border-[#1c3359] bg-[#e9eff7] text-[#1c3359]" : "border-[#c9a068] bg-[#fcf4ea] text-[#1c3359]"}`}>{n}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function GoldDivider() {
  return (
    <div className="mx-auto flex w-full max-w-[460px] items-center gap-3 text-[#b98b4f]">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b98b4f]/70" />
      <span className="text-sm">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b98b4f]/70" />
    </div>
  );
}
