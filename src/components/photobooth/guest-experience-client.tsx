"use client";

import dynamic from "next/dynamic";
import type { GuestExperienceProps } from "./guest-experience";

const ClientGuestExperience = dynamic(() => import("./guest-experience"), {
  ssr: false,
  loading: () => <main className="min-h-[100svh] bg-transparent" aria-hidden="true" suppressHydrationWarning />,
});

export default function GuestExperienceClient(props: GuestExperienceProps) {
  return <ClientGuestExperience {...props} />;
}
