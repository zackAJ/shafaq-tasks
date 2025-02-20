import React from 'react';
import { Outlet } from 'react-router';

const GuestLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-purple-50 grid place-items-center">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
