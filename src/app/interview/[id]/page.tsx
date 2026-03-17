import { getCandidate } from "./actions";
import InterviewPage from "@/pages/interview/interview";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = await getCandidate(id);

  return <InterviewPage candidate={candidate} candidateId={id} />;
}
