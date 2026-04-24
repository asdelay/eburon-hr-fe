"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  deleteCandidateProfile,
  startNewInterview,
  updateCandidateProfile,
} from "@/app/candidate/actions";
import { Candidate } from "@/types/candidate";
import InterviewCard from "@/components/InterviewCard";

type CandidateProfileModuleProps = {
  candidate: Candidate;
};

const initialState = { message: "", success: false };

export default function CandidateProfileModule({
  candidate,
}: CandidateProfileModuleProps) {
  const [state, formAction, pending] = useActionState(
    updateCandidateProfile,
    initialState,
  );

  const years = Math.floor((candidate.experience ?? 0) / 12);
  const months = (candidate.experience ?? 0) % 12;
  console.log(candidate);

  return (
    <div className="w-full max-w-2xl rounded-xl border border-border bg-background/60 p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review and update your candidate details.
      </p>

      <Separator className="my-5" />

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="candidateId" value={candidate.id} />

        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={candidate.fullName}
            placeholder="-"
            required
          />
          {!candidate.fullName.trim() && (
            <p className="text-white/30">Please, fill in your Full Name</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={candidate.email}
            disabled
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={candidate.phone ?? ""}
            placeholder="+32470111111"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            defaultValue={candidate.role}
            required
            placeholder="-"
          />
          {!candidate.role.trim() && (
            <p className="text-white/30">Please, fill in your desired role</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="experience-y">Experience (years)</Label>
            <Input
              id="experience-y"
              name="experience-y"
              type="number"
              min={0}
              max={99}
              defaultValue={years}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience-m">Experience (months)</Label>
            <Input
              id="experience-m"
              name="experience-m"
              type="number"
              min={0}
              max={11}
              defaultValue={months}
            />
          </div>
        </div>

        {state.message ? (
          <p
            className={
              state.success
                ? "text-sm text-green-600"
                : "text-sm text-destructive"
            }
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save changes"}
          </Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </form>

      <Separator className="my-5" />

      {candidate.interview ? (
        <InterviewCard {...candidate.interview} />
      ) : (
        <p className="text-white/30 my-4">No Interview Yet</p>
      )}

      <div className="flex flex-wrap gap-3 justify-between">
        <form action={startNewInterview}>
          <input type="hidden" name="candidateId" value={candidate.id} />
          <Button type="submit" variant="secondary">
            Take new interview
          </Button>
        </form>

        <form action={deleteCandidateProfile}>
          <input type="hidden" name="candidateId" value={candidate.id} />
          <Button type="submit" variant="destructive">
            Delete profile
          </Button>
        </form>
      </div>
    </div>
  );
}
