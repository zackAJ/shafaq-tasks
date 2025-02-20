import React, { useState } from 'react';
import { Link } from 'react-router';
import { register } from '@/api/auth';
import { RegisterForm, ValidationErrorBag } from '@/types/forms';
import FormError from "@/components/common/FormError"
import { useAuthStore } from '@/store/auth';
import LoadingBtn from "@/components/common/LoadingBtn";
import AuthWrapper from '@/components/auth/AuthWarpper';

const RegisterPage = () => {
    const { setToken } = useAuthStore()
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState<ValidationErrorBag>({})

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        await register(form, (bag) => setErrors({ ...bag }), setToken);
        setLoading(false)
    };

    return (
        <AuthWrapper title="Welcome">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onBlur={(e) => setForm({ ...form, name: e.target.value.trim() })}
                        required
                    />
                    <FormError errors={errors} name={"name"} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onBlur={(e) => setForm({ ...form, email: e.target.value.trim() })}
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
                        onBlur={(e) => setForm({ ...form, password: e.target.value.trim() })}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={form.password_confirmation}
                        onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                        onBlur={(e) => setForm({ ...form, password_confirmation: e.target.value.trim() })}
                        required
                    />
                    <FormError errors={errors} name={"password"} />
                </div>
                <LoadingBtn loading={loading} type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white">
                    Register
                </LoadingBtn>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800">Login</Link>
            </p>
        </AuthWrapper>
    );
};

export default RegisterPage;
