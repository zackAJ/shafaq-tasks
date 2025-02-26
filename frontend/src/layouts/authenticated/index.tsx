import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { Navigate, Outlet } from 'react-router';
import Header from './partials/Header.tsx';
import { useEffect, useState } from 'react';
import { getUser } from '@/api/user.ts';
import PageLoader from '@/components/common/PageLoader.tsx';
import PremiumPopup from '@/components/common/PremiumPopup.tsx';
import { useUiStore } from '@/store/ui.ts';
import { Slide, ToastContainer } from 'react-toastify';

const AuthLayout = () => {

  const authStore = useAuthStore()
  const userStore = useUserStore()
  const uiStore = useUiStore()

  const [loading, setLoading] = useState(true)

  async function asyncFetch() {
    const { data, error } = await getUser()
    if (!error) userStore.setUser(data.data)

    setLoading(false)
  }

  useEffect(() => {
    asyncFetch()
  }, [])

  return loading ?
    (< PageLoader />) :
    (
      <div className='w-full min-h-screen bg-purple-50'>
        <Header className="flex justify-between w-full px-8 py-4 border-b border-gray-200 text-white" />
        <div className="grid place-items-center p-8" >
          {!authStore.isAuthenticated() && <Navigate to='/login' />
          }
          <Outlet />
        </div >
        <PremiumPopup open={uiStore.premiumPopup} onClose={() => uiStore.togglePremiumPopup(false)} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </div >
    )
};

export default AuthLayout;
