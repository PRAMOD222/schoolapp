'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

export default function SignupPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseApi}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Navbar />
            </div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded shadow-md w-80"
                >
                    <div className='my-6'>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an Account?
                            <Link href="/login" className="font-medium text-[#763f98] hover:text-[#53286e]"> Log In</Link>
                        </p>
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#763f98] text-white py-2 rounded hover:bg-[#53286e]"
                    >
                        Signup
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
