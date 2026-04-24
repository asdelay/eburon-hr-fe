import { getCandidate } from "@/dal/dal";
import InterviewPage from "@/pages/interview/interview";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = await getCandidate();
  if (!candidate) return <h1>No candidate data available</h1>;

  return <InterviewPage candidate={candidate} candidateId={id} />;
}
