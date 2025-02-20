import { useAuthStore } from '@/store/auth';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const GuestLayout: React.FC = () => {
  const authStore = useAuthStore()
  const navigate = useNavigate()


  useEffect(() => {
    if (authStore.isAuthenticated()) navigate('/dashboard')

    return
  }, [])


  return (
    <div className="w-full min-h-screen bg-purple-50 grid place-items-center">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
