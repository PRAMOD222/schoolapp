"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Loader } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Footer from "@/components/Footer";

interface SchoolProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  city: string;
  googleMapLink: string;
  vision: string;
  mission: string;
  aboutSchool: string;
}
const baseApi = process.env.NEXT_PUBLIC_BASE_API

export default function SchoolProfilePage() {
  const { subdomain } = useParams();
  const [school, setSchool] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subdomain) return; // Prevent fetching with undefined subdomain

    const fetchSchoolProfile = async () => {
      if (!baseApi || !subdomain) {
        console.error("Missing API URL or subdomain");
        return;
      }

      const apiUrl = `${baseApi}/profile/get-by-domain/${subdomain}`;


      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch school data");
        const data = await res.json();
        setSchool(data);
        console.log("School profile data:", data);

      } catch (error) {
        console.error("Error fetching school profile:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchSchoolProfile();
  }, [subdomain]);




  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin w-20 h-20 text-[#763f98]" />
    </div>
  );

  if (!school) return <p>No school profile found.</p>;

  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      <nav className=" mx-6 md:mx-32 xl:mx-44 flex gap-8 flex-col md:flex-row justify-between ">
        <div className="logo border w-1/2 md:w-[10%] aspect-square p-2 md:p-8">
          <Image width={200} height={200} src={`${baseApi}${school.logo}`} alt={school.name} className="object-contain w-full" />
        </div>
        <div className=" flex-1 flex flex-col justify-between">
          <h1 className="text-xl md:text-4xl font-bold">{school.name}</h1>
          <p className="text-sm md:text-base"><strong>City:</strong> {school.city} <strong>Address:</strong> {school.address}</p>
          <Separator className="my-2"/>
          <div className="flex gap-4">
            <Link href={`tel:${school.phone}`} className="block w-max px-4 py-2 bg-[#763f98] text-white rounded-md hover:bg-[#53286e] transition-all duration-300">{school.phone}</Link>
            <Link href={`mailto:${school.email}`} className="block w-max px-4 py-2 bg-[#763f98] text-white rounded-md hover:bg-[#53286e] transition-all duration-300">Mail</Link>
          </div>
        </div>
        <div className="address flex flex-col md:items-end justify-center">
          {/* <h2>{school.address}</h2> */}
          <Link href={school.googleMapLink} className="block w-max text-[#763f98] h-max">Get Direction</Link>
        </div>
      </nav>

      <section className="my-10">
        <div className="px-6 md:px-32 xl:px-44 bg-gray-100 whitespace-pre-wrap py-4">
          <h2 className="text-2xl font-bold text-[#763f98] my-4">About School</h2>
          <p className="text-gray-600">{school.aboutSchool}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mx-6 md:mx-32 xl:mx-44">
          <div className="">
            <h2 className="text-2xl font-bold text-[#763f98] my-4">Vision</h2>
            <p className="text-gray-600">{school.vision}</p>
          </div>
          <div className="">
            <h2 className="text-2xl font-bold text-[#763f98] my-4">Mission</h2>
            <p className="text-gray-600">{school.mission}</p>
          </div>
        </div>

      </section>

      <Footer />

    </div>
  );
}
