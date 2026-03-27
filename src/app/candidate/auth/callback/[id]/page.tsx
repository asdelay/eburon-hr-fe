import React from "react";

interface VerifyResult {
  message: string;
  access_token?: string;
  error?: string;
  statusCode?: number;
}

const CallBackPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me?link=${id}`,
  );
  const isSuccess: VerifyResult = await res.json();
  return (
    <div className="min-h-screen flex items-center flex-col gap-4">
      <h1 className="font-bold text-2xl">{isSuccess.message}</h1>
      {isSuccess.access_token && <p>{isSuccess.access_token}</p>}
      <p>{isSuccess?.error}</p>
    </div>
  );
};

export default CallBackPage;
