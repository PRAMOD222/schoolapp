"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAdvertisementFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

const DashNav: React.FC = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <div className=" w-[20vw] ">
      <div className=" bg-[#763f98] shadow-lg min-h-screen h-full p-8 w-[20vw]">
        <Link href="/" className="logo bg-white w-full mx-auto rounded-md block p-4">
          <h2 className="text-3xl font-bold text-[#763f98]">LOGO</h2>
        </Link>

        <div className="links my-2 flex flex-col gap-2">
          <Link href="/dashboard">
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                pathname === "/dashboard"
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
              }`}
            >
              <RxDashboard className="inline text-xl" /> Dashboard
            </h2>
          </Link>

          <Link href="/dashboard/editprofile">
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                pathname === "/dashboard/editprofile"
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
              }`}
            >
              <RxDashboard className="inline text-xl" /> Edit Profile
            </h2>
          </Link>

         
        </div>

        <Button className="bg-white hover:bg-white border-2 text-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashNav;
