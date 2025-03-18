import React from "react";
import DashNav from "./DashNav";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <DashNav />
      <main className="w-full min-h-screen m-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
