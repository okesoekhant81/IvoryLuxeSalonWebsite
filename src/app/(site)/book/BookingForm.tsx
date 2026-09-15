"use client";

import { useState } from "react";
import type { ServiceGroup } from "@/lib/get-all-services";

const STEPS = ["Your Details", "Service", "Preferred Time", "Message"];

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

export default function BookingForm({
  serviceGroups,
  action,
}: {
  serviceGroups: ServiceGroup[];
  action: (formData: FormData) => Promise<void>;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function goNext() {
    if (step === 0) {
      const nextErrors: typeof errors = {};
      if (!values.name.trim()) nextErrors.name = "Please enter your name.";
      if (!values.phone.trim()) nextErrors.phone = "Please enter your phone number.";
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown";

  return (
    <form action={action} className="mt-8 pb-20 md:pb-24">
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-brown" : "bg-black/10"}`} />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>

      <div className={step === 0 ? "mt-6 space-y-5" : "hidden"}>
        <div>
          <label htmlFor="name" className="block text-sm text-black">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-black">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-black">
            Email <span className="text-muted">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className={step === 1 ? "mt-6" : "hidden"}>
        <label htmlFor="service" className="block text-sm text-black">
          Which service are you interested in?
        </label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={(e) => update("service", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brown"
        >
          <option value="">Select a service (optional)</option>
          {serviceGroups.map((group) => (
            <optgroup key={group.page} label={group.label}>
              {group.items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className={step === 2 ? "mt-6 grid gap-5 sm:grid-cols-2" : "hidden"}>
        <div>
          <label htmlFor="preferredDate" className="block text-sm text-black">
            Preferred date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={values.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className="block text-sm text-black">
            Preferred time
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={values.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className={step === 3 ? "mt-6" : "hidden"}>
        <label htmlFor="message" className="block text-sm text-black">
          Message <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Anything else we should know?"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded-full border border-black/10 px-6 py-2.5 font-serif-italic text-sm text-black/70 transition-colors hover:border-brown hover:text-brown"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
          >
            Request Appointment
          </button>
        )}
      </div>
    </form>
  );
}
