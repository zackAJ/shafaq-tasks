import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/css/globals.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import GuestLayout from "@/layouts/guest"
import AuthLayout from "@/layouts/authenticated"
import LoginPage from "@/pages/auth/Login"
import RegisterPage from "@/pages/auth/Register"
import Dashboard from "@/pages/dashboard"
import boot from "@/lib/boot"

boot()

const RedirectComponent = () => {
  return <Navigate to="/dashboard" />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<RedirectComponent />}>
        </Route>

        <Route element={<GuestLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
