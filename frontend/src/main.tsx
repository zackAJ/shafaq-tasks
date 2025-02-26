import { createRoot } from 'react-dom/client'
import '@/css/globals.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import GuestLayout from "@/layouts/guest"
import AuthLayout from "@/layouts/authenticated"
import LoginPage from "@/pages/auth/Login"
import RegisterPage from "@/pages/auth/Register"
import Dashboard from "@/pages/dashboard"
import boot from "@/lib/boot"
import CreateTaskPage from './pages/dashboard/CreateTaskPage'
import TaskPage from './pages/dashboard/TaskPage'
import NotFound from './pages/404/NotFound'
import BillingRedirectPage from './pages/billing'

boot()

const RedirectComponent = () => {
  return <Navigate to="/dashboard" />
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<RedirectComponent />}>
      </Route>

      <Route element={<GuestLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='dashboard'>
          <Route index element={<Dashboard />} />
          <Route path='create' element={<CreateTaskPage />} />
          <Route path=':taskId/:verb?' element={<TaskPage />} />
        </Route>

        <Route path='billing' element={<BillingRedirectPage />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
