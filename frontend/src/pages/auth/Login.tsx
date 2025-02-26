import React, { useState } from 'react';
import { Link } from 'react-router';
import { login } from '@/api/auth';
import { LoginForm, ValidationErrorBag } from '@/types/forms';
import LoadingBtn from '@/components/common/LoadingBtn';
import { useAuthStore } from '@/store/auth';
import AuthWrapper from '@/components/auth/AuthWarpper';
import FormError from '@/components/common/FormError';

const LoginPage = () => {

    const { setToken } = useAuthStore()

    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<ValidationErrorBag>({})

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        await login(form, setErrors, setToken);
        setLoading(false)
    };

    return (
        <AuthWrapper title="Welcome back">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm !ring-indigo-900 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                    <FormError errors={errors} name={"email"} />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />

                    <FormError errors={errors} name={"password"} />
                </div>
                <LoadingBtn loading={loading} type="submit" className="w-full">
                    Login
                </LoadingBtn>
            </form>
            <p className="mt-4 text-center text-sm">
                Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-800">Register</Link>
            </p>
        </AuthWrapper>
    );
};

export default LoginPage;
