import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {

  const authStore = useAuthStore()
  const userStore = useUserStore()

  if (!authStore.isAuthenticated()) {
    authStore.clear()
    userStore.clear()
  }

  return (
    <div className="w-full min-h-screen bg-purple-50 grid place-items-center">
      {!authStore.isAuthenticated() && <Navigate to='/login' />}
      <div>Auth layout</div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
