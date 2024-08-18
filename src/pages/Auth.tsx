import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import { UrlState } from '@/components/URLProvider';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('url');

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `url=${longLink}` : ''}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className='flex flex-col items-center gap-10 mt-12'>
      <h1 className='text-3xl font-extrabold'>
        {searchParams.get('url')
          ? "Hold up! Let's login first.."
          : 'Login / Signup'}
      </h1>

      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='signup'>Signup</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Login />
        </TabsContent>
        <TabsContent value='signup'>
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
