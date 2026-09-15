"use client";

import { useActionState, useRef, useState, startTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ServicePicker from "./ServicePicker";
import BookingSuccess from "./BookingSuccess";
import type { ServiceGroup } from "@/lib/get-all-services";
import type { BookingActionState } from "@/lib/actions/bookings";

const EASE = [0.16, 1, 0.3, 1] as const;
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

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BookingForm({
  serviceGroups,
  action,
}: {
  serviceGroups: ServiceGroup[];
  action: (prevState: BookingActionState, formData: FormData) => Promise<BookingActionState>;
}) {
  const [state, dispatch, pending] = useActionState<BookingActionState, FormData>(action, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStartedAt] = useState(() => Date.now());

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
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
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function submitBooking() {
    if (pending || !formRef.current) return;
    const formData = new FormData(formRef.current);
    // MUST be wrapped — without this, `pending` lies and rapid taps
    // can submit the same booking 2-3 times before the UI catches up.
    startTransition(() => {
      dispatch(formData);
    });
  }

  const isLastStep = step === STEPS.length - 1;

  // The action button is always type="button" — never "submit" — so its behavior can
  // never race with a native form-submit event depending on exactly when isLastStep
  // flips mid-click. Advancing steps and submitting both go through explicit handlers.
  function handlePrimaryAction() {
    if (isLastStep) submitBooking();
    else goNext();
  }

  if (state?.success) {
    return (
      <div className="pb-20 md:pb-0">
        <BookingSuccess />
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 font-serif-italic text-sm text-brown underline decoration-1 underline-offset-4 hover:opacity-70"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-black outline-none focus:border-brown";

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="mt-8 pb-28 md:pb-24">
      <div className="mb-5 flex items-center gap-3">
        {step > 0 && (
          <motion.button
            type="button"
            onClick={goBack}
            aria-label="Back"
            whileTap={{ scale: 0.9 }}
            className="-ml-1.5 flex size-8 shrink-0 touch-manipulation select-none items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/[0.04] hover:text-black md:hidden"
          >
            <ChevronLeft />
          </motion.button>
        )}
        <div className="flex-1">
          <p className="text-xs text-muted">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-black/[0.06]">
            <motion.div
              className="h-full rounded-full bg-brown"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </div>
        </div>
      </div>

      {state && !state.success && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      {/* Visual, per-step inputs — controlled only, no `name`. The always-mounted hidden
          inputs below are what actually carry values into the FormData built on submit,
          so nothing is lost when AnimatePresence unmounts a step's content. */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-black">
                    Full name
                  </label>
                  <input
                    id="name"
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
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <ServicePicker groups={serviceGroups} value={values.service} onChange={(v) => update("service", v)} />
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm text-black">
                    Preferred date
                  </label>
                  <input
                    id="preferredDate"
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
                    type="time"
                    value={values.preferredTime}
                    onChange={(e) => update("preferredTime", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="message" className="block text-sm text-black">
                  Message <span className="text-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Anything else we should know?"
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <input type="hidden" name="name" value={values.name} />
      <input type="hidden" name="phone" value={values.phone} />
      <input type="hidden" name="email" value={values.email} />
      <input type="hidden" name="service" value={values.service} />
      <input type="hidden" name="preferredDate" value={values.preferredDate} />
      <input type="hidden" name="preferredTime" value={values.preferredTime} />
      <input type="hidden" name="message" value={values.message} />
      <input type="hidden" name="formStartedAt" value={formStartedAt} />
      {/* Honeypot — real users never see this field; left uncontrolled so a bot's own
          DOM-filling script (which bypasses React state) still shows up in FormData. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
      />

      {/* Desktop action bar */}
      <div className="mt-8 hidden items-center gap-3 md:flex">
        {step > 0 && (
          <motion.button
            type="button"
            onClick={goBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24, mass: 0.5 }}
            className="touch-manipulation select-none rounded-full border border-black/10 px-6 py-2.5 font-serif-italic text-sm text-black/70 transition-colors hover:border-brown hover:text-brown"
          >
            Back
          </motion.button>
        )}
        <motion.button
          type="button"
          onClick={handlePrimaryAction}
          disabled={pending}
          whileHover={{ scale: pending ? 1 : 1.04 }}
          whileTap={{ scale: pending ? 1 : 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 24, mass: 0.5 }}
          className="touch-manipulation select-none rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-colors duration-300 hover:bg-black disabled:opacity-60"
        >
          {isLastStep ? (pending ? "Sending…" : "Request Appointment") : "Next"}
        </motion.button>
      </div>

      {/* Mobile app-style sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
        <motion.button
          type="button"
          onClick={handlePrimaryAction}
          disabled={pending}
          whileTap={{ scale: pending ? 1 : 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 24, mass: 0.5 }}
          className="block w-full touch-manipulation select-none rounded-full bg-brown px-8 py-3.5 text-center font-serif-italic text-base text-white shadow-lg transition-colors duration-300 active:bg-black disabled:opacity-60"
        >
          {isLastStep ? (pending ? "Sending…" : "Request Appointment") : "Continue"}
        </motion.button>
      </div>
    </form>
  );
}
