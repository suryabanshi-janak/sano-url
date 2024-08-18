import { Link, useNavigate } from 'react-router-dom';
import { LinkIcon, LogOut } from 'lucide-react';
import { BarLoader } from 'react-spinners';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UrlState } from '../URLProvider';
import useFetch from '@/hooks/useFetch';
import { logout } from '@/db/auth';

export default function Header() {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  const { loading, fn: logoutFn } = useFetch(logout);

  return (
    <>
      <nav className='flex items-center justify-between py-4'>
        <Link to='/'>
          <img src='/logo.png' alt='logo' className='h-16' />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate('/auth')}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className='w-10 overflow-hidden rounded-full'>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/dashboard' className='flex'>
                    <LinkIcon className='mr-2 size-3' />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-red-400'
                  onClick={() => {
                    logoutFn().then(() => {
                      fetchUser();
                      navigate('/auth');
                    });
                  }}
                >
                  <LogOut className='mr-2 size-3' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
    </>
  );
}
