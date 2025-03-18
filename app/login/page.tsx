'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/store/authSlice';
import { RootState, AppDispatch } from '@/store/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        }
    }, [user, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(loginUser(formData));
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Navbar />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                    <div className='my-6'>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome Back!</h2>
                        <h2 className="my-3 text-center font-bold tracking-tight text-[#763f98]">Login to your Account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href='/signup' className="font-medium text-[#763f98] hover:text-[#53286e]"> Sign Up Now</Link>
                        </p>
                    </div>

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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;