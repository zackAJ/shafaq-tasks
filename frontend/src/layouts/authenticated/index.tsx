import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { Navigate, Outlet } from 'react-router';
import Header from './partials/Header.tsx';
import { useEffect } from 'react';

const AuthLayout = () => {

  const authStore = useAuthStore()
  const userStore = useUserStore()

  useEffect(() => {

    if (!authStore.isAuthenticated()) {
      authStore.clear()
      userStore.clear()
    }

  }, [])

  return (
    <div className='w-full min-h-screen bg-purple-50 '>
      <Header className="flex justify-between w-full px-8 py-4 border-b border-gray-200 text-white" />
      <div className="grid place-items-center p-8">
        {!authStore.isAuthenticated() && <Navigate to='/login' />}
        <Outlet />
      </div>
    </div>
  )
};

export default AuthLayout;
