"use client";

import { useFormStatus } from "react-dom";

export default function FormActionButton({
  action,
  label,
  pendingLabel,
  tone = "default",
}: {
  action: () => Promise<void>;
  label: string;
  pendingLabel?: string;
  tone?: "default" | "danger";
}) {
  return (
    <form action={action}>
      <Button label={label} pendingLabel={pendingLabel ?? label} tone={tone} />
    </form>
  );
}

function Button({
  label,
  pendingLabel,
  tone,
}: {
  label: string;
  pendingLabel: string;
  tone: "default" | "danger";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-60 ${
        tone === "danger"
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-brown/30 text-brown hover:bg-brown/10"
      }`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
