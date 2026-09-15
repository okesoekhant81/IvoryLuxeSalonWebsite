"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
  label = "Delete",
  triggerClassName = "text-sm text-red-600 underline underline-offset-2 hover:opacity-70",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {label}
      </button>
      <form ref={formRef} action={action} className="hidden" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-black">{confirmMessage}</p>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 transition-colors hover:border-black/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    formRef.current?.requestSubmit();
                  }}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
                >
                  {label}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
