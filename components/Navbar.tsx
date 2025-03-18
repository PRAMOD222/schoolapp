"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdAccountCircle } from "react-icons/md";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav className="mx-6 md:mx-32 xl:mx-44 flex items-center justify-between py-4 bg-white">
      {/* Left: Logo */}
      <Link href="/">
        <h2 className="text-3xl font-bold text-[#763f98]">LOGO</h2>
      </Link>

      {/* Right: Login/User Name */}
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[#763f98] cursor-pointer">
              <MdAccountCircle className="text-2xl inline" /> Account
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>

                <span className="cursor-pointer">Welcome, {user.name}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 text-white bg-[#763f98] rounded-md hover:bg-[#53286e] transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
