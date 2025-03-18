"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import Image from "next/image";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

interface SchoolProfile {
    subDomain: string;
    name: string;
    logo: File | null;
    phone: string;
    email: string;
    city: string;
    address: string;
    googleMapLink: string;
    aboutSchool: string;
    vision: string;
    mission: string;
    _id: string | null;
}

const CreateSchoolProfile = () => {
    const [school, setSchool] = useState<SchoolProfile>({
        subDomain: "",
        name: "",
        logo: null,
        phone: "",
        email: "",
        city: "",
        address: "",
        googleMapLink: "",
        aboutSchool: "",
        vision: "",
        mission: "",
        _id: null,
    });

    const [logo, setLogo] = useState<string | null>(null);

    const [token, setToken] = useState<string | null>(null);
    const [isDomainAvailable, setIsDomainAvailable] = useState<boolean>(false);

    const fetchSchoolProfile = async () => {
        try {
            const response = await axios.get(`${baseApi}/profile/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;

            if (data) {
                console.log("School profile data:", data);

                setSchool(data);
                setLogo(data.logo);
                debouncedCheckSubdomain(data.subDomain);
            }
            console.log("School profile data:", data);
        } catch (error) {
            console.error("Error fetching school profile:", error);
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (token) {
            fetchSchoolProfile();
        }
    }, [token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSchool((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSchool((prev) => ({ ...prev, logo: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("subDomain", school.subDomain);
        formData.append("name", school.name);
        formData.append("phone", school.phone);
        formData.append("email", school.email);
        formData.append("city", school.city);
        formData.append("address", school.address);
        formData.append("googleMapLink", school.googleMapLink);
        formData.append("aboutSchool", school.aboutSchool);
        formData.append("vision", school.vision);
        formData.append("mission", school.mission);
        if (school.logo) formData.append("logo", school.logo);
    
        try {
            if (school._id) {
                // **If `_id` exists, update profile**
                await axios.put(`${baseApi}/profile/update/${school._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("School Profile Updated!");
            } else {
                // **If `_id` is missing, create new profile**
                await axios.post(`${baseApi}/profile/add`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("School Profile Created!");
            }
    
            // Re-fetch updated profile after submission
            fetchSchoolProfile();
        } catch (error) {
            toast.error("Error saving profile");
        }
    };
    

    const handleDomainChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Update state immediately
        setSchool((prev) => ({ ...prev, subDomain: value }));

        // Check if the length is enough before making an API call
        if (value.length >= 3) {
            debouncedCheckSubdomain(value);
        } else {
            setIsDomainAvailable(false);
        }
    };

    // Use debounce to delay API requests while typing
    const debouncedCheckSubdomain = debounce(async (value: string) => {
        console.log("Checking subdomain availability...", value);

        try {
            const response = await axios.get(`${baseApi}/profile/check-subdomain/${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API response:", response.data);


            if (response.data.available) {
                setIsDomainAvailable(true);
            } else {
                setIsDomainAvailable(false);
            }
        } catch (error) {
            toast.error("Error checking subdomain availability");
        }
    }, 500);

    return (
        <div className="container mx-auto p-4">

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-2 text-base font-medium">

                <div className="flex gap-4">
                    <Label className="flex flex-col items-start">
                        Domain
                        <Input type="text" name="subDomain" value={school.subDomain} onChange={handleDomainChange} placeholder="Subdomain"  />

                        {school.subDomain.length >= 3 && (
                            isDomainAvailable ? (
                                <p className="text-green-500">Subdomain available</p>
                            ) : (
                                <p className="text-red-500">Subdomain not available</p>
                            )
                        )}
                    </Label>
                    <Label className="flex flex-col items-start">
                        Logo
                        <Input type="file" name="logo" onChange={handleFileChange} required={school._id ? false : true} />
                    </Label>
                    {logo && <Image src={`${baseApi}${logo}`} alt="Logo" width={100} height={100} />}

                </div>

                <div className="flex gap-4 ">
                    <Label className="flex flex-col items-start flex-1">
                        School Name
                        <Input type="text" name="name" value={school.name} onChange={handleChange} placeholder="School Name" required />
                    </Label>
                    <Label className="flex flex-col items-start flex-1">
                        School Phone Number
                        <Input type="tel" name="phone" value={school.phone} onChange={handleChange} placeholder="Phone" required />
                    </Label>
                    <Label className="flex flex-col items-start flex-1">
                        School Email
                        <Input type="email" name="email" value={school.email} onChange={handleChange} placeholder="Email" required />
                    </Label>
                </div>
                <div className="flex gap-4">
                    <Label className="flex flex-col items-start flex-1">
                        City
                        <Input type="text" name="city" value={school.city} onChange={handleChange} placeholder="City" required />
                    </Label>
                    <Label className="flex flex-col items-start flex-1">
                        Address
                        <Input type="text" name="address" value={school.address} onChange={handleChange} placeholder="Address" required />
                    </Label>
                    <Label className="flex flex-col items-start flex-1">
                        Google Map Link
                        <Input type="text" name="googleMapLink" value={school.googleMapLink} onChange={handleChange} placeholder="Google Map Link" required />
                    </Label>
                </div>
                <Label className="flex flex-col items-start">
                    About School
                    <Textarea name="aboutSchool" value={school.aboutSchool} onChange={handleChange} placeholder="About School" required />
                </Label>
                <Label className="flex flex-col items-start">
                    Vision
                    <Textarea name="vision" value={school.vision} onChange={handleChange} placeholder="Vision" required />
                </Label>
                <Label className="flex flex-col items-start">
                    Mission
                    <Textarea name="mission" value={school.mission} onChange={handleChange} placeholder="Mission" required />
                </Label>

                <Button type="submit" className="bg-blue-500 text-white">Submit</Button>
            </form>

        </div>
    );
};

export default CreateSchoolProfile;
