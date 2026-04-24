import { getCandidate } from "@/dal/dal";
import CandidateProfileModule from "@/modules/candidate/CandidateProfileModule";

const CandidateProfile = async () => {
  const userData = await getCandidate();

  if (!userData) {
    return <h1 className="mt-20 px-4">No data available about the user.</h1>;
  }

  return (
    <div className="mx-auto mt-20 flex justify-center min-h-screen w-full max-w-4xl px-4 pb-10">
      <CandidateProfileModule candidate={userData} />
    </div>
  );
};

export default CandidateProfile;
