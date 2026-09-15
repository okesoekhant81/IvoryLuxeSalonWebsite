"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
  className = "rounded-full bg-brown px-6 py-2.5 font-serif-italic text-sm text-white transition-all duration-300 hover:bg-black disabled:opacity-60",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
