"use client";

import Button from "@/components/Button";
import { useCandidateForm } from "./hooks";

export default function CandidateFormModule() {
  const [state, formAction, pending] = useCandidateForm();

  const inputClass =
    "w-full px-3 py-2 mt-1 mb-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50";

  return (
    <form
      action={formAction}
      className="w-full flex flex-col p-6 rounded-2xl border border-white/30 max-w-lg"
    >
      <label htmlFor="fullName">Enter your Full Name *</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="John Doe"
        className={inputClass}
        required
      />
      <label htmlFor="email">Enter your Email *</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="johndoe@exp.com"
        className={inputClass}
        required
      />
      <label htmlFor="phone">Enter your Phone Number</label>
      <input
        id="phone"
        name="phone"
        type="text"
        placeholder="+32470111111"
        className={inputClass}
      />
      <label htmlFor="role">Enter your Role *</label>
      <input
        id="role"
        name="role"
        type="text"
        placeholder="Junior Frontend Developer"
        className={inputClass}
        required
      />
      <label htmlFor="experience">Enter your experience *</label>
      <input
        id="experience"
        name="experience"
        type="text"
        placeholder="1 year / 3 months / etc"
        className={inputClass}
        required
      />
      {state?.message && (
        <p aria-live="polite" className="text-red-400 my-2">
          {state.message}
        </p>
      )}

      <hr className="my-4 text-white/30 rounded-2xl" />
      <div className="flex items-center justify-between gap-4 mt-2">
        <Button variant="outline" type="reset">
          Reset
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Loading..." : "Start AI Interview"}
        </Button>
      </div>
    </form>
  );
}
