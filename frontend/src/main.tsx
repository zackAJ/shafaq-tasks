import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import GuestLayout from "@/layouts/Guest"
import Login from "@/pages/auth/Login"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
