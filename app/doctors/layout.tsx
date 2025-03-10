import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dreach.in | Doctors",
  description:
    "Dreach.in is a platform for doctors and patients to connect and communicate.",
};

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
};

export default layout;
