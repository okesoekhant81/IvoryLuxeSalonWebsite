"use client";

export default function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-sm text-red-600 underline underline-offset-2 hover:opacity-70">
        Delete
      </button>
    </form>
  );
}
