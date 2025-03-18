import Navbar from '@/components/Navbar'
import { Home } from 'lucide-react'
import React from 'react'
import HomeCarousel from '@/components/HomeCarousel'
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Footer from '@/components/Footer';


const baseApi = process.env.NEXT_PUBLIC_BASE_API;
const Page = async () => {

  const fetchSchoolProfiles = async () => {
    try {
      const response = await fetch(`${baseApi}/profile/all`);
      const data = await response.json();
      // console.log("School profiles:", data);

      return data;
    } catch (error) {
      console.log("Error fetching school profiles:", error);

    }
  };

  const allSchoolProfiles = await fetchSchoolProfiles();

  return (
    <div>

      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <section>
        <HomeCarousel />
      </section>

      <section className='my-10'>
        <div className="mx-6 md:mx-32 xl:mx-44">
          {
            allSchoolProfiles && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allSchoolProfiles.map((school: any) => (
                  <div key={school._id} className="bg-white border rounded-md p-4">
                    <Image src={`${baseApi}${school.logo}`} alt="School Logo" width={100} height={100} className='w-full object-cover aspect-[2/1]' />
                    <h2 className="md:text-xl font-semibold">{school.name}</h2>
                    <h3 className='text-sm'>{school.address}</h3>
                    <Separator className='my-1' />
                    <Link
                      href={`http://${school.subDomain}.localhost:3000`}
                      rel="noopener noreferrer"
                      className='flex items-center gap-2 hover:text-[#763f98]'
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Page