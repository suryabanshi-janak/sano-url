import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function AuthLayout() {
  return (
    <main className='min-h-screen flex flex-col'>
      <div className='flex-1 container'>
        <Header />
        <Outlet />
      </div>

      <footer className='p-6 text-center bg-gray-800 mt-6'>
        Made with 💖 by Zanak
      </footer>
    </main>
  );
}
