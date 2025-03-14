import Verify from "@/components/page-components/Auth/Verify";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ phone: string }>;
}) => {
  const params = await searchParams;
  console.log(params.phone);
  return (
    <div>
      <Verify phone={params.phone} />
    </div>
  );
};

export default page;
