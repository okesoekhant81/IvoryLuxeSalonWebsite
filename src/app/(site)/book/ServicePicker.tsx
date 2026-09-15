"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ServiceGroup } from "@/lib/get-all-services";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicePicker({
  groups,
  value,
  onChange,
}: {
  groups: ServiceGroup[];
  value: string;
  onChange: (value: string) => void;
}) {
  const initialTab = groups.find((g) => g.categories.some((c) => c.items.includes(value)))?.page ?? groups[0]?.page;
  const [activeTab, setActiveTab] = useState(initialTab);
  const activeGroup = groups.find((g) => g.page === activeTab);

  return (
    <div>
      <p className="text-sm text-black">Which service are you interested in?</p>

      <div className="mt-3 flex gap-2">
        {groups.map((group) => (
          <motion.button
            key={group.page}
            type="button"
            onClick={() => setActiveTab(group.page)}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={`relative touch-manipulation select-none rounded-full px-4 py-2 text-sm transition-colors ${
              activeTab === group.page ? "text-white" : "text-black/60 hover:text-black"
            }`}
          >
            {activeTab === group.page && (
              <motion.span
                layoutId="service-tab-pill"
                className="absolute inset-0 rounded-full bg-brown"
                transition={{ type: "spring", stiffness: 550, damping: 34 }}
              />
            )}
            <span className="relative">{group.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 max-h-72 space-y-4 overflow-y-auto rounded-xl border border-black/[0.06] bg-black/[0.015] p-3">
        {activeGroup?.categories.map((category) => (
          <div key={category.title}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">{category.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {category.items.map((item) => {
                const selected = value === item;
                return (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => onChange(selected ? "" : item)}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className={`inline-flex touch-manipulation select-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      selected
                        ? "border-brown bg-brown text-white"
                        : "border-black/10 bg-white text-black/80 hover:border-brown/50"
                    }`}
                  >
                    {selected && <CheckIcon />}
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {value && (
        <p className="mt-2 text-xs text-muted">
          Selected: <span className="text-brown">{value}</span> ·{" "}
          <button type="button" onClick={() => onChange("")} className="underline underline-offset-2">
            Clear
          </button>
        </p>
      )}
      {!value && <p className="mt-2 text-xs text-muted">Optional — tap a service, or skip this step.</p>}
    </div>
  );
}
